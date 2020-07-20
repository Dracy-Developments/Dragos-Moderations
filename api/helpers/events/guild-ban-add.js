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

    // TODO: Add discipline records for bans not issued by the main bot.

    // Add a 1 second timeout to allow audit logs to process
    setTimeout(async () => {
      // Find out who applied the ban
      const fetchedLogs = await inputs.guild.fetchAuditLogs({
        limit: 5,
        type: "MEMBER_BAN_ADD",
      });
      var auditLog = fetchedLogs.entries.find(
        (entry) => entry.target.id === inputs.user.id
      );

      // If the ban was executed by the bot
      if (auditLog && auditLog.executor.id === Client.user.id) {
        let bannedEmbedBot = new Discord.MessageEmbed()
          .setAuthor(`${Client.user.tag}`, `${Client.user.displayAvatarURL()}`)
          .setTitle(`:no_entry: User Banned`)
          .setDescription(`A ban was applied on a user by the bot.`)
          .setColor(`#DC3545`)
          .addField(
            `User Banned`,
            `<@${inputs.user.id}> (${inputs.user.tag} / ${inputs.user.id})`
          )
          .addField(
            `Reason for Ban`,
            `${auditLog.reason ? auditLog.reason : `Unspecified or Unknown`}`
          )
          .setTimestamp()
          .setFooter(`The ban was applied by the bot`);
        await sails.helpers.guild.send("banLogChannel", inputs.guild, ``, {
          embed: bannedEmbedBot,
        });
      } else if (auditLog && auditLog.executor) {
        // The ban was executed by someone else, either another bot or a member via Discord's ban
        let bannedEmbed = new Discord.MessageEmbed()
          .setAuthor(
            `${auditLog.executor.tag}`,
            `${auditLog.executor.displayAvatarURL()}`
          )
          .setTitle(`:no_entry: User Banned`)
          .setDescription(`A user was banned from the guild.`)
          .setColor(`#DC3545`)
          .addField(
            `User Banned`,
            `<@${inputs.user.id}> (${inputs.user.tag} / ${inputs.user.id})`
          )
          .addField(
            `Reason for Ban`,
            `${auditLog.reason ? auditLog.reason : `Unspecified or Unknown`}`
          )
          .setTimestamp()
          .setFooter(`Executor ID: ${auditLog.executor.id}`);
        await sails.helpers.guild.send("banLogChannel", inputs.guild, ``, {
          embed: bannedEmbed,
        });
      } else {
        // We do not know who executed the ban
        let bannedEmbedUnknown = new Discord.MessageEmbed()
          .setAuthor(`Unknown Executor`)
          .setTitle(`:no_entry: User Banned`)
          .setDescription(`A user was banned from the guild.`)
          .setColor(`#DC3545`)
          .addField(
            `User Banned`,
            `<@${inputs.user.id}> (${inputs.user.tag} / ${inputs.user.id})`
          )
          .addField(`Reason for Ban`, `Unknown Reason`)
          .setTimestamp();
        await sails.helpers.guild.send("banLogChannel", inputs.guild, ``, {
          embed: bannedEmbedUnknown,
        });
      }
    }, 1000);
  },
};
