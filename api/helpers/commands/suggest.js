module.exports = {
  friendlyName: "suggest",

  description: "Make a suggestion for the bot.",

  inputs: {
    message: {
      type: "ref",
      required: true,
      description: "The message that triggered the command",
    },
    suggestion: {
      type: "string",
      required: true,
      description: "The suggestion the user wants to suggest.",
      maxLength: 1024,
    },
  },

  exits: {},

  fn: async function (inputs) {
    // Delete original message
    inputs.message.delete();

    if (
      !sails.config.custom.discord.suggestionsChannel ||
      sails.config.custom.discord.suggestionsChannel === ``
    ) {
      throw new ErrorWithImage(
        "https://i.imgur.com/pw6ya91.gif",
        "discord.suggestionsChannel was not configured yet in the bot settings! Please contact the bot administrator."
      );
    }

    // Construct embed
    var suggestion = new Discord.MessageEmbed()
      .setTitle(`Suggest - New Suggestion filed!`)
      .setColor(`#800FF`)
      .setDescription(inputs.suggestion)
      .setAuthor(
        `${inputs.message.author.tag}`,
        `${inputs.message.author.displayAvatarURL()}`
      )
      .setFooter(`Guild: ${inputs.message.guild.name} (${inputs.message.guild.id}) | User ID: ${inputs.message.author.id}`)
      .setTimestamp()
      .setThumbnail(
        `https://cdn.discordapp.com/emojis/726113039912403005.png?v=1`
      );

    // Send to the suggestions channel for the bot
    try {
      var channel = Client.channels.resolve(
        sails.config.custom.discord.suggestionsChannel
      );
      var m = await channel.send(suggestion);
      await m.react(`✅`);
      await m.react(`❌`);
    } catch (e) {
      throw new ErrorWithImage(
        "https://i.imgur.com/pw6ya91.gif",
        `Unable to resolve the channel from config discord.suggestionsChannel. Please contact the bot administrator.`
      );
    }

    // Send acknowledgment
    inputs.message.channel
      .send(
        `☑️ Your Suggestion has Been submitted! Please remember the developers have full discretion which suggestions they accept.`
      )
      .then((m) => m.delete({ timeout: 10000 }));
  },
};
