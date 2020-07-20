module.exports = {
  friendlyName: "Credits",
  description:
    "Show's a list of people who helped out with the Drago's Moderation Bot Development.",

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

    // Credits configurable
    // Note: Field limit means you can only have up to 25 objects in here. Make sure total character count does not exceed 6000.
    var credits = [
      {
        names: [`Sector Seven#3820`],
        contributions: `Migrated Drago's Moderation to Sails.js and Helped out Developing Drago's Moderations`,
      },
      {
        names: [`Shadowplays4k#6969`, `LostNuke#9114`, `codic#3754`],
        contributions: `Help out Develop Drago's Moderations`,
      },
      {
        names: [`Chan#8808`, `That Duck David#9502`],
        contributions: `Support & Helped out Drago's Moderation with Suggestions and Feedbacks During the Development of Drago's Moderations`,
      },
    ];

    // Construct embed
    var creator = await Client.users.fetch(`563854476021334047`);
    let creditsEmbed = new Discord.MessageEmbed()
      .setAuthor(
        `${inputs.message.author.tag}`,
        `${inputs.message.author.displayAvatarURL()}`
      )
      .setTitle(`Credits - Bot Developers and Supporters`)
      .setDescription(
        `Please give a warm thanks to the people who made this bot possible:`
      )
      .setColor(`#8800FF`)
      .setTimestamp()
      .setFooter(
        `Bot Creator: ${creator.tag} | User ID: ${inputs.message.author.id}`,
        creator.displayAvatarURL({ dynamic: true })
      );
    credits.map((credit) =>
      creditsEmbed.addField(
        `${credit.names.map((name) => `**${name}**`).join(", ")}`,
        credit.contributions
      )
    );
    inputs.message.channel.send(creditsEmbed);
  },
};
