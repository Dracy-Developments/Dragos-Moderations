module.exports = {
  friendlyName: "Archive",

  description:
    "Clone the channel the command was executed in, and deny view channel permissions for @everyone on the original.",

  inputs: {
    message: {
      type: "ref",
      required: true,
      description: "The original message",
    },
  },

  exits: {},

  fn: async function (inputs) {
    // Delete the original command message
    inputs.message.delete();

    // Check permissions
    await sails.helpers.permissions.checkPermission(
      inputs.message,
      `MANAGE_CHANNELS`
    );

    // Clone the channel first
    var newChannel = await inputs.message.channel.clone({
      options: { reason: "Channel archive" },
    });

    // Remove all permissions; set deny on everyone
    await inputs.message.channel.overwritePermissions(
      [
        {
          id: inputs.message.channel.guild.roles.everyone,
          deny: ["VIEW_CHANNEL"],
        },
      ],
      "Channel archive"
    );

    // Edit the channel name
    await inputs.message.channel.edit({
      name: `${inputs.message.channel.name}-archived`,
    });

    // Send a cloned channel message
    let clonedEmbed = new Discord.MessageEmbed()
      .setAuthor(
        `Drago's Moderation - Archive`,
        `${Client.user.displayAvatarURL()}`
      )
      .setDescription(
        `:exclamation: This is a cloned channel; the original channel by the same name has been archived.`
      )
      .setColor(`#8800FF`)
      .setTimestamp()
      .setFooter(
        `Archive was requested by ${inputs.message.author.username}`,
        `${inputs.message.author.displayAvatarURL({ dynamic: "true" })}`
      );
    await newChannel.send(clonedEmbed);

    // Send a notice in the channel archived
    let archivedEmbed = new Discord.MessageEmbed()
      .setAuthor(
        `Drago's Moderation - Archive`,
        `${Client.user.displayAvatarURL()}`
      )
      .setDescription(
        `:exclamation: This channel has been archived; all permissions have been removed.
        
:warning: If this channel was a part of bot configuration, be sure to update it with the new channel!`
      )
      .setColor(`#8800FF`)
      .setTimestamp()
      .setFooter(
        `Archive was requested by ${inputs.message.author.username}`,
        `${inputs.message.author.displayAvatarURL({ dynamic: "true" })}`
      );
    return inputs.message.channel.send(archivedEmbed);
  },
};
