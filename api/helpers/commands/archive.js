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

    var newChannel = await inputs.message.channel.clone({
      options: { reason: "Channel archive" },
    });

    await inputs.message.channel.overwritePermissions(
      [
        {
          id: inputs.message.channel.guild.roles.everyone,
          deny: ["VIEW_CHANNEL"],
        },
      ],
      "Channel archive"
    );

    await inputs.message.channel.edit({
      name: `${inputs.message.channel.name}-archived`,
    });

    await newChannel.send(
      `:exclamation: This is a cloned channel; the original channel by the same name has been archived.`
    );

    return inputs.message.channel.send(
      ":white_check_mark: This channel has been archived." +
        "\n" +
        ":warning: If this channel was a part of bot configuration, be sure to update it with the new channel!"
    );
  },
};
