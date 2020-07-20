module.exports = {
  friendlyName: "Presence update",

  description: "",

  inputs: {
    oldPresence: {
      type: "ref",
      description: "The old presence",
    },
    newPresence: {
      type: "ref",
      required: true,
      description: "The new presence",
    },
  },

  exits: {},

  fn: async function (inputs) {
    // TODO: disabled for now; generates too many messages
    return;

    // Skip bots; they often cycle through presences to display stats
    if (inputs.newPresence.user.bot) return;

    var oldActivities = inputs.oldPresence
      ? inputs.oldPresence.activities.map((activity) => {
          return {
            emoji: activity.emoji,
            name: activity.name,
            details: activity.details,
          };
        })
      : [];
    var newActivities = inputs.newPresence
      ? inputs.newPresence.activities.map((activity) => {
          return {
            emoji: activity.emoji,
            name: activity.name,
            details: activity.details,
          };
        })
      : [];

    if (!_.isEqual(_.sortBy(oldActivities), _.sortBy(newActivities))) {
      const activityTag = new Discord.MessageEmbed()
        .setAuthor(
          `${inputs.newPresence.user.tag}`,
          `${inputs.newPresence.user.displayAvatarURL()}`
        )
        .setTitle(`:video_game: A member changed their presence / status.`)
        .addField(
          `Old Presence`,
          `\`\`\`${JSON.stringify(oldActivities)}\`\`\``
        )
        .addField(
          `New Presence`,
          `\`\`\`${JSON.stringify(newActivities)}\`\`\``
        )
        .setColor(`#6610f2`)
        .setTimestamp()
        .setFooter(`User ID: ${inputs.newPresence.user.id}`);
      await sails.helpers.guild.send(
        "userLogChannel",
        inputs.newPresence.guild,
        ``,
        {
          embed: activityTag,
        }
      );
    }
  },
};
