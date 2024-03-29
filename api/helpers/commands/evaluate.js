const beautify = require("beautify");

module.exports = {
  friendlyName: "Evaluate",

  description: "Evaluate provided Node.js code.",

  inputs: {
    message: {
      type: "ref",
      required: true,
      description: "The message that triggered the command",
    },
    script: {
      type: "string",
      required: true,
      description: "The script that should be evaluated",
    },
  },

  exits: {},

  fn: async function (inputs) {
    // Delete the original command message
    inputs.message.delete();

    // This command may only be used by the bot owner
    await sails.helpers.permissions.checkBotOwner(inputs.message);

    // Do not allow using the sails.config as we can access sensitive info such as credentials
    if (inputs.script.includes(`sails`) && inputs.script.includes(`config`)) {
      throw new Error(
        `You are not allowed to access sails.config in the eval command.`
      );
    }

    // Evaluate the script
    const evaluated = eval(inputs.script);

    // Process the output
    const embed = new Discord.MessageEmbed()
      .setAuthor(
        `${inputs.message.author.tag}`,
        `${inputs.message.author.displayAvatarURL()}`
      )
      .setTitle(`Evaluate`)
      .setColor(`#8800FF`)
      .setTimestamp()
      .addField(
        ":inbox_tray: Input: ",
        `\`\`\`js\n ${beautify(inputs.script, { format: "js" })} \`\`\``
      )
      .addField(":outbox_tray: Output", evaluated)
      .addField("Type of: ", typeof evaluated)
      .setFooter(`User ID: ${inputs.message.author.id}`)
      .setThumbnail(Client.user.displayAvatarURL());
    return inputs.message.channel.send(embed);
  },
};
