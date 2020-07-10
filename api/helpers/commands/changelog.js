var pjson = require('../../../package.json');

module.exports = {
  friendlyName: "Changelog",
  description: "Display Any changes that were made on the bot",

  inputs: {
    message: {
      type: "ref",
      required: true,
      description: "The message that triggered the command",
    },
  },

  exits: {},

  fn: async function (inputs) {
    // Delete original message
    inputs.message.delete();

    // Construct embed
    const changelog = new Discord.MessageEmbed()
      .setAuthor(
        `Changelog - ${pjson.version}`,
        `${Client.user.displayAvatarURL()}`
      )
      .setDescription(`**Changelog will be released in the __beta__ stage**`) // TODO
      .setColor(`#8800FF`)
      .setFooter(
        `Changelog was requested by ${inputs.message.author.username}`,
        `${inputs.message.author.displayAvatarURL({ dynamic: "true" })}`
      )
      .setTimestamp();

    // Send embed
    inputs.message.channel.send(changelog);
  },
};
