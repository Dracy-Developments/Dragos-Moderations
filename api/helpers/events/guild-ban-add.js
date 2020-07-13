module.exports = {
  friendlyName: "events.guildBanAdd",

  description: "Discord guild ban add event.",

  inputs: {
    guild: {
      type: "ref",
      required: true,
      description: "The guild banned from.",
    },
    user: {
      type: "ref",
      required: true,
      description: "The user banned.",
    },
  },

  fn: async function (inputs) {
    // Upgrade partial messages to full users
    if (inputs.user.partial) {
      await inputs.user.fetch();
    }

    // Find out who applied the ban
    // TODO: Add discipline records for bans not issued by the main bot.
    setTimeout(async () => {
      const fetchedLogs = await inputs.guild.fetchAuditLogs({
        limit: 1,
        type: "MEMBER_BAN_ADD",
      });
      var auditLog = fetchedLogs.entries.first();
      if (!auditLog || auditLog.target.id !== inputs.user.id)
        auditLog = undefined;

      // If the ban was executed by the bot
      if (auditLog && auditLog.executor.id === Client.user.id) {
        let bannedEmbedBot = new Discord.MessageEmbed()
          .setAuthor(
            `Drago's Moderation - User Banned`,
            `${Client.user.displayAvatarURL()}`
          )
          .setDescription(`:no_entry: A ban was applied on a user by the bot.`)
          .setColor(`#DC3545`)
          .addField(
            `User Banned`,
            `<@${inputs.user.id}> (${inputs.user.tag} / ${inputs.user.id})`
          )
          .addField(
            `Reason for Ban`,
            `${auditLog.reason ? auditLog.reason : `Unspecified or Unknown`}`
          )
          .setTimestamp();
        await sails.helpers.guild.send("banLogChannel", inputs.guild, ``, {
          embed: bannedEmbedBot,
        });
      } else if (auditLog && auditLog.executor) {
        // The ban was executed by someone else, either another bot or a member via Discord's ban
        let bannedEmbed = new Discord.MessageEmbed()
          .setAuthor(
            `Drago's Moderation - User Banned`,
            `${Client.user.displayAvatarURL()}`
          )
          .setDescription(`:no_entry: A user was banned from the guild.`)
          .setColor(`#DC3545`)
          .addField(
            `User Banned`,
            `<@${inputs.user.id}> (${inputs.user.tag} / ${inputs.user.id})`
          )
          .addField(
            `Banned By`,
            `<@${auditLog.executor.id}> (${auditLog.executor.tag} / ${auditLog.executor.id})`
          )
          .addField(
            `Reason for Ban`,
            `${auditLog.reason ? auditLog.reason : `Unspecified or Unknown`}`
          )
          .setTimestamp();
        await sails.helpers.guild.send("banLogChannel", inputs.guild, ``, {
          embed: bannedEmbed,
        });
      } else {
        // We do not know who executed the ban
        let bannedEmbedUnknown = new Discord.MessageEmbed()
          .setAuthor(
            `Drago's Moderation - User Banned`,
            `${Client.user.displayAvatarURL()}`
          )
          .setDescription(`:no_entry: A user was banned from the guild.`)
          .setColor(`#DC3545`)
          .addField(
            `User Banned`,
            `<@${inputs.user.id}> (${inputs.user.tag} / ${inputs.user.id})`
          )
          .addField(`Banned By`, `Unknown`)
          .addField(`Reason for Ban`, `Unknown Reason`)
          .setTimestamp();
        await sails.helpers.guild.send("banLogChannel", inputs.guild, ``, {
          embed: bannedEmbedUnknown,
        });
      }
    }, 1000);
  },
};
