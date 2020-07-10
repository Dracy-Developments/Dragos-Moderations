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
      throw new Error(
        "discord.suggestionsChannel was not configured yet in the bot settings! Please contact the bot administrator."
      );
    }

    // Construct embed
    const suggestion = new Discord.MessageEmbed()
      .setTitle(`New Suggestion for Drago's Moderation!`)
      .setColor(`#800FF`)
      .setDescription(inputs.suggestion)
      .setAuthor(
        `${inputs.message.author.username}`,
        `${inputs.message.author.displayAvatarURL({ dynamic: true })}`
      )
      .setThumbnail(
        `https://cdn.discordapp.com/emojis/726113039912403005.png?v=1`
      );

    // Send to the suggestions channel for the bot
    try {
      var channel = Client.channels.resolve(
        sails.config.custom.discord.suggestionsChannel
      );
      var m = await channel.send(inputs.suggestion);
      await m.react(`✅`);
      await m.react(`❌`);
    } catch (e) {
      throw new Error(
        `Unable to resolve the channel from config discord.suggestionsChannel. Please contact the bot administrator.`
      );
    }

    // Send acknowledgment
    inputs.message.channel
      .send(`☑️ Your Suggestion has Been posted`)
      .then((m) => m.delete({ timeout: 5000 }));
  },
};
