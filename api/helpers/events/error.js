module.exports = {
  friendlyName: "events.error",

  description: "DiscordClient error event.",

  inputs: {
    error: {
      type: "ref",
      description: "Error",
      required: true,
    },
  },

  fn: async function (inputs) {
    sails.log.error(inputs.error);

    var clientSettings = await sails.models.clients.findOne({ id: 1 });

    // Bot log in error channel
    const errorMessage = new Discord.MessageEmbed()
      .setTitle(`❌ A Discord.js error occurred.`)
      .setDescription(`${inputs.error.message}\n\u200b`)
      .setColor(`#ee110f`)
      .setTimestamp()
      .setThumbnail(
        `https://cdn.discordapp.com/emojis/604486986170105866.png?v=1`
      );
    var channel = await Client.channels.fetch(clientSettings.botErrorsChannel);
    if (channel) channel.send(errorMessage);
  },
};
