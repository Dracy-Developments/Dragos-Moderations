const fetch = require(`node-fetch`);

module.exports = {
  friendlyName: "Duck",
  description: "An easter egg command that was requested by That Duck David.",

  inputs: {
    message: {
      type: "ref",
      required: true,
      description: "The message that triggered the command",
    },
  },

  exits: {},

  fn: async function (inputs) {
    // Delete the original command message
    inputs.message.delete();

    // Fetch duck picture URL
    const { url } = await fetch(
      "https://random-d.uk/api/v2/random"
    ).then((response) => response.json());

    // Embed duck
    const embed = new Discord.MessageEmbed()
      .setAuthor(
        `Drago's Moderation - Duck`,
        `${Client.user.displayAvatarURL()}`
      )
      .setTitle(`🦆 Quack Quack!`)
      .setImage(url)
      .setColor(`RANDOM`)
      .setTimestamp()
      .setFooter(
        `Duck was requested by ${inputs.message.author.username}`,
        `${inputs.message.author.displayAvatarURL({ dynamic: "true" })}`
      );

    // Send duck
    inputs.message.channel.send(embed);
  },
};
