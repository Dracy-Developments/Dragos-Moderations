module.exports = {
  friendlyName: "Verify",

  description: "Verify someone in a welcome incidents channel.",

  inputs: {
    message: {
      type: "ref",
      required: true,
      description: "The message that triggered the command",
    },
  },

  exits: {},

  fn: async function (inputs) {
    var guildSettings = await inputs.message.guild.settings();

    // Delete the original command message
    inputs.message.delete();

    // Check permissions
    await sails.helpers.permissions.checkPermission(
      inputs.message,
      `MANAGE_CHANNELS`
    );

    // Reject if command not used in an incidents channel
    if (
      inputs.message.channel.type !== "text" ||
      !guildSettings.incidentsCategory ||
      !inputs.message.channel.parent ||
      inputs.message.channel.parent.id !== guildSettings.incidentsCategory ||
      !inputs.message.channel.name.startsWith("welcome-")
    ) {
      // await sails.helpers.spam.add(inputs.message.member, 20, inputs.message);
      throw new Error(
        `This command may only be used in a welcome incidents channel.`
      );
    }

    // Get the members
    var members = inputs.message.channel.name.split("|");
    if (members.length < 2) {
      throw new Error(
        `Could not find which members are supposed to be verified (tried checking the channel topic).`
      );
    }

    // Remove the first item; it's not a member.
    members.shift();

    // Assign verified role to members
    var maps = members.map(async (_member) => {
      var member = inputs.message.guild.members.resolve(_member);
      if (!member) {
        sails.log.warn(
          `verify command: Member ${_member} not found. Skipping.`
        );
      } else {
        if (guildSettings.verifiedRole) {
          var role = inputs.message.guild.roles.resolve(
            guildSettings.verifiedRole
          );
          if (!role) {
            sails.log.warn(`verify command: verifiedRole not found. Skipping.`);
          } else {
            await member.roles.add(role, `Verified member`);
          }
        }
      }
    });
    await Promise.all(maps);

    if (guildSettings.verifiedRole) {
      await inputs.message.channel.send(
        ":white_check_mark: Member(s) have been verified and were given the verifiedRole. This channel will be deleted in 30 seconds."
      );
      setTimeout(() => {
        inputs.message.channel.delete();
      }, 30000);
    } else {
      await inputs.message.channel.send(
        ":white_check_mark: verifiedRole is not configured, so any verified roles must be added manually. This channel will be deleted in 30 seconds."
      );
      setTimeout(() => {
        inputs.message.channel.delete();
      }, 30000);
    }
  },
};
