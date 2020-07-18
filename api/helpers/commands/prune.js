module.exports = {
  friendlyName: "commands.prune",

  description: "Prune Discord messages in a channel.",

  inputs: {
    message: {
      type: "ref",
      required: true,
      description: "The original message",
    },
    limit: {
      type: "number",
      min: 1,
      max: 1000,
      defaultsTo: 100,
      isInteger: true,
      description: "Maximum number of messages to delete.",
    },
    filter: {
      type: "string",
      isIn: [
        "link",
        "invite",
        "bots",
        "you",
        "me",
        "upload",
        "user",
        "noupload",
      ],
      description:
        "Choose a filter to decide which messages to prune. If no filter provided, all messages are subject to removal.",
    },
  },

  fn: async function (inputs) {
    // Delete the original command message
    inputs.message.delete();

    // Check permissions
    await sails.helpers.permissions.checkPermission(
      inputs.message,
      `MANAGE_CHANNELS`
    );

    // Initialize
    let embed1 = new Discord.MessageEmbed()
      .setAuthor(
        `${inputs.message.author.tag}`,
        `${inputs.message.author.displayAvatarURL()}`
      )
      .setColor(`BLUE`)
      .setTitle(`Prune - Pruning...`)
      .setTimestamp()
      .setFooter(`User ID: ${inputs.message.author.id}`)
      .setDescription(`This may take a bit...`);
    var message = await inputs.message.channel.send(embed1);

    // Prune
    var errors = await process(inputs.message, inputs.limit, inputs.filter);

    // Edit with complete message
    let embed2 = new Discord.MessageEmbed()
      .setAuthor(
        `${inputs.message.author.tag}`,
        `${inputs.message.author.displayAvatarURL()}`
      )
      .setTitle(`Prune - Messages Pruned!`)
      .setTimestamp()
      .setColor(errors > 0 ? `YELLOW` : `GREEN`)
      .setDescription(`Messages have been pruned!`)
      .setFooter(`User ID: ${inputs.message.author.id} | Errors: ${errors}`);
    return message.edit(embed2);
  },
};

// Determine function for filtering depending on provided filter
function getFilter(message, filter, user) {
  switch (filter) {
    // Here we use Regex to check for the diffrent types of prune options
    case "link":
      return (mes) => /https?:\/\/[^ /.]+\.[^ /.]+/.test(mes.content);
    case "invite":
      return (mes) =>
        /(https?:\/\/)?(www\.)?(discord\.(gg|li|me|io)|discordapp\.com\/invite)\/.+/.test(
          mes.content
        );
    case "bots":
      return (mes) => mes.author.bot;
    case "you":
      return (mes) => mes.author.id === DiscordClient.user.id;
    case "me":
      return (mes) => mes.author.id === message.author.id;
    case "upload":
      return (mes) => mes.attachments.size > 0;
    case "user":
      return (mes) => mes.author.id === user.id;
    case "noupload":
      return (mes) => mes.attachments.size === 0;
    default:
      return () => true;
  }
}

// Main process function for executing the prunes in iteration until done.
function process(message, limit, filter) {
  return new Promise((resolve, reject) => {
    var iteration = 0;
    var before = message.id;
    var errors = 0;
    var fn = () => {
      _process(message, limit, filter, before).then((filtered) => {
        errors += filtered[2];
        if (filtered[0] <= 0) limit = -1;
        before = filtered[1];
        limit -= filtered[0];
        iteration++;

        if (limit > 0 && iteration < 10) {
          setTimeout(() => {
            fn();
          }, 1000);
        } else {
          return resolve(errors);
        }
      });
    };
    fn();
  });
}

// An iteration of pruning
async function _process(message, amount, filter, before) {
  let errors = 0;
  let messages = await message.channel.messages.fetch({
    limit: 100,
    before: before,
  });
  if (messages.array().length <= 0) return [-1];
  before = messages.lastKey();
  if (filter) {
    const user = typeof filter !== "string" ? filter : null;
    const type = typeof filter === "string" ? filter : "user";
    messages = messages.filter(getFilter(message, type, user));
  }
  messages = messages.array().slice(0, amount);
  let maps = messages.map(async (msg) => {
    try {
      await msg.delete();
    } catch (e) {
      errors++;
    }
  });
  await Promise.all(maps);
  return [messages.length, before, errors];
}
