module.exports = {
  friendlyName: "events.guildBanRemove",

  description: "Discord guild ban remove event.",

  inputs: {
    guild: {
      type: "ref",
      required: true,
      description: "The guild un-banned from.",
    },
    user: {
      type: "ref",
      required: true,
      description: "The user un-banned.",
    },
  },

  fn: async function (inputs) {
    // Upgrade partial messages to full users
    if (inputs.user.partial) {
      await inputs.user.fetch();
    }

    // Find out who removed the ban
    // TODO: Appeal ban discipline records when bans are removed.
    setTimeout(async () => {
      const fetchedLogs = await inputs.guild.fetchAuditLogs({
        limit: 1,
        type: "MEMBER_BAN_REMOVE",
      });
      var auditLog = fetchedLogs.entries.first();
      if (!auditLog || auditLog.target.id !== inputs.user.id)
        auditLog = undefined;

      // If the ban was removed by the bot
      if (auditLog && auditLog.executor.id === Client.user.id) {
        let unbannedEmbedBot = new Discord.MessageEmbed()
          .setAuthor(
            `Drago's Moderation - User Un-Banned`,
            `${Client.user.displayAvatarURL()}`
          )
          .setDescription(
            `:no_entry: :arrows_counterclockwise: A ban was removed from a user by the bot.`
          )
          .setColor(`#DC3545`)
          .addField(
            `User Un-Banned`,
            `<@${inputs.user.id}> (${inputs.user.tag} / ${inputs.user.id})`
          )
          .addField(
            `Reason for Un-Ban`,
            `${auditLog.reason ? auditLog.reason : `Unspecified or Unknown`}`
          )
          .setTimestamp();
        await sails.helpers.guild.send("banLogChannel", inputs.guild, ``, {
          embed: unbannedEmbedBot,
        });
      } else if (auditLog && auditLog.executor) {
        // The ban was removed by someone else, either another bot or a member via Discord
        let unbannedEmbed = new Discord.MessageEmbed()
          .setAuthor(
            `Drago's Moderation - User Un-Banned`,
            `${Client.user.displayAvatarURL()}`
          )
          .setDescription(
            `:no_entry: :arrows_counterclockwise: A user was un-banned from the guild.`
          )
          .setColor(`#DC3545`)
          .addField(
            `User Un-Banned`,
            `<@${inputs.user.id}> (${inputs.user.tag} / ${inputs.user.id})`
          )
          .addField(
            `Un-Banned By`,
            `<@${auditLog.executor.id}> (${auditLog.executor.tag} / ${auditLog.executor.id})`
          )
          .addField(
            `Reason for Un-Ban`,
            `${auditLog.reason ? auditLog.reason : `Unspecified or Unknown`}`
          )
          .setTimestamp();
        await sails.helpers.guild.send("banLogChannel", inputs.guild, ``, {
          embed: unbannedEmbed,
        });
      } else {
        // We do not know who removed the ban
        let unbannedEmbedUnknown = new Discord.MessageEmbed()
          .setAuthor(
            `Drago's Moderation - User Un-Banned`,
            `${Client.user.displayAvatarURL()}`
          )
          .setDescription(
            `:no_entry: :arrows_counterclockwise: A user was un-banned from the guild.`
          )
          .setColor(`#DC3545`)
          .addField(
            `User Un-Banned`,
            `<@${inputs.user.id}> (${inputs.user.tag} / ${inputs.user.id})`
          )
          .addField(`Un-Banned By`, `Unknown`)
          .addField(`Reason for Un-Ban`, `Unknown Reason`)
          .setTimestamp();
        await sails.helpers.guild.send("banLogChannel", inputs.guild, ``, {
          embed: unbannedEmbedUnknown,
        });
      }
    }, 1000);
  },
};