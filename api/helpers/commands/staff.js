module.exports = {
  friendlyName: "commands.staff",

  description:
    "Discord Staff command to create a private text channel between staff and member(s).",

  inputs: {
    message: {
      type: "ref",
      required: true,
    },
  },

  fn: async function (inputs) {
    // Delete original message for confidentiality
    await inputs.message.delete();

    // Check abilities
    await sails.helpers.permissions.checkPermission(
      inputs.message,
      `MANAGE_CHANNELS`
    );

    // Check restrictions
    if (
      await sails.helpers.moderation.checkAction(
        await inputs.message.member.moderation(),
        "Cannot use staff command"
      )
    ) {
      throw new Error(
        `You are not allowed to use the staff command due to past abuse. Please contact a staff member via DMs instead.`
      );
    }

    var guildSettings = await inputs.message.guild.settings();
    var prefix =
      guildSettings.prefix || sails.config.custom.discord.defaultPrefix;

    var isStaff = inputs.message.member.hasPermission("VIEW_AUDIT_LOG");

    // Count open channels if not staff and error if they already have 3 channels open
    if (!isStaff) {
      var channels = inputs.message.guild.channels.cache.filter(
        (channel) =>
          channel.type === "text" &&
          guildSettings.incidentsCategory &&
          channel.parent &&
          channel.parent.id === guildSettings.incidentsCategory &&
          channel.name.startsWith("inquiry-") &&
          channel.topic.includes(`${inputs.message.author.id}|`)
      );
      if (channels.length > 2) {
        // await sails.helpers.spam.add(inputs.message.member, 20, inputs.message);
        throw new Error(
          `You may only have up to 3 staff/inquiry channels open at a time.`
        );
      }
    }

    // Create the channel
    var channel = await sails.helpers.incidents.createChannel(
      "inquiry",
      inputs.message.guild,
      [inputs.message.member]
    );

    // Create the intro message
    if (isStaff) {
      channel.send(
        `<@${inputs.message.member.id}>, to add members you would like to speak to, use the command \`${prefix}grant | member\`.`
      );
    } else {
      // TODO: If we allow report command self moderation, put that in the message if it is set.
      channel.send(`:eye_in_speech_bubble: **Staff, <@${inputs.member.id}> would like to speak with you**.
        
  <@${inputs.member.id}>, please send your inquiry here. If you are reporting members for rule violations, explain the violation and upload evidence, such as screenshots and recordings.`);
    }
  },
};
