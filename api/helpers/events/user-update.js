module.exports = {
  friendlyName: "events.userUpdate",

  description: "Discord user update event",

  inputs: {
    oldUser: {
      type: "ref",
      required: true,
      description: "The old version of the user",
    },
    newUser: {
      type: "ref",
      required: true,
      description: "The updated version of the user",
    },
  },

  fn: async function (inputs) {
    // Get the full user if a partial
    if (inputs.newUser.partial) {
      await inputs.newUser.fetch();
    }

    // Add event logs to guilds if things changed
    // Note: We do not have to broadcastEval because every shard will get this event
    Client.guilds.cache
      .filter((guild) => guild.members.resolve(inputs.newUser.id))
      .each(async (guild) => {
        // Add an event log if the user's tag changed
        if (
          !inputs.oldUser.partial &&
          inputs.oldUser.tag !== inputs.newUser.tag
        ) {
          const userTag = new Discord.MessageEmbed()
            .setAuthor(
              `${inputs.newUser.tag}`,
              `${inputs.newUser.displayAvatarURL()}`
            )
            .setTitle(`:star_struck: A member changed their username/tag.`)
            .addField(`Old Username`, `${inputs.oldUser.tag}`)
            .addField(`New Username`, `${inputs.newUser.name}`)
            .setColor(`#6610f2`)
            .setTimestamp()
            .setFooter(`User ID: ${inputs.newUser.id}`);
          await sails.helpers.guild.send("userLogChannel", guild, ``, {
            embed: userTag,
          });
        }

        // Add an event log if the user's avatar changed
        if (
          !inputs.oldUser.partial &&
          inputs.oldUser.avatar !== inputs.newUser.avatar
        ) {
          const avatarTag = new Discord.MessageEmbed()
            .setAuthor(
              `${inputs.newUser.tag}`,
              `${inputs.newUser.displayAvatarURL()}`
            )
            .setTitle(`:face_with_monocle: A member changed their avatar.`)
            .setDescription(
              `Old avatar is at the bottom. New avatar is in the thumbnail.`
            )
            .setColor(`#6610f2`)
            .setTimestamp()
            .setFooter(
              `User ID: ${inputs.newUser.id}`,
              `${inputs.oldUser.displayAvatarURL()}`
            )
            .setThumbnail(`${inputs.newUser.displayAvatarURL()}`);
          await sails.helpers.guild.send("userLogChannel", guild, ``, {
            embed: avatarTag,
          });
        }
      });
  },
};
