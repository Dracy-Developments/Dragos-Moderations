module.exports = {
  friendlyName: "events.inputs.memberRemove",

  description: "Discord guild member remove event",

  inputs: {
    member: {
      type: "ref",
      required: true,
      description: "The member that left the guild",
    },
  },

  fn: async function (inputs) {
    // Can't do anything if the guild member is a partial
    if (inputs.member.partial) {
      return;
    }

    // get mod logs
    var modLogs = await inputs.member.moderation();

    // TODO: Add discipline logs for kicks if not done by the bot

    // Set a 1 second timeout to allow audit logs to come through
    setTimeout(async () => {
      // Find out who kicked the member if they were kicked
      const fetchedLogs = await inputs.member.guild.fetchAuditLogs({
        limit: 5,
        type: "MEMBER_KICK",
      });
      var auditLog = fetchedLogs.entries.find(
        (entry) => entry.target.id === inputs.member.id
      );

      // If the kick was executed by the bot
      if (auditLog && auditLog.executor.id === Client.user.id) {
        let kickedEmbedBot = new Discord.MessageEmbed()
          .setAuthor(`${Client.user.tag}`, `${Client.user.displayAvatarURL()}`)
          .setTitle(`:athletic_shoe: User kicked`)
          .setDescription(`A member was kicked from the guild by the bot.`)
          .setColor(`#DC3545`)
          .addField(
            `User Kicked`,
            `<@${inputs.member.id}> (${inputs.member.user.tag} / ${inputs.member.id})`
          )
          .addField(
            `Reason for Kick`,
            `${auditLog.reason ? auditLog.reason : `Unspecified or Unknown`}`
          )
          .setFooter(`The kick was executed by the bot`)
          .setTimestamp();
        await sails.helpers.guild.send(
          "kickLogChannel",
          inputs.member.guild,
          ``,
          {
            embed: kickedEmbedBot,
          }
        );
      } else if (auditLog && auditLog.executor) {
        // The kick was executed by someone else, either another bot or a member via Discord's kick
        let kickedEmbed = new Discord.MessageEmbed()
          .setAuthor(
            `${auditLog.executor.tag}`,
            `${auditLog.executor.displayAvatarURL()}`
          )
          .setTitle(`:athletic_shoe: User kicked`)
          .setDescription(`A member was kicked from the guild.`)
          .setColor(`#DC3545`)
          .addField(
            `User Kicked`,
            `<@${inputs.member.id}> (${inputs.member.user.tag} / ${inputs.member.id})`
          )
          .addField(
            `Reason for Kick`,
            `${auditLog.reason ? auditLog.reason : `Unspecified or Unknown`}`
          )
          .setFooter(`Executor ID: ${auditLog.executor.id}`)
          .setTimestamp();
        await sails.helpers.guild.send(
          "kickLogChannel",
          inputs.member.guild,
          ``,
          {
            embed: kickedEmbed,
          }
        );
      } else if (auditLog) {
        // We do not know who executed the kick
        let kickedEmbedUnknown = new Discord.MessageEmbed()
          .setAuthor(`Unknown Executor`)
          .setTitle(`:athletic_shoe: User kicked`)
          .setDescription(`A member was kicked from the guild.`)
          .setColor(`#DC3545`)
          .addField(
            `User Kicked`,
            `<@${inputs.member.id}> (${inputs.member.user.tag} / ${inputs.member.id})`
          )
          .addField(`Reason for Kick`, `Unknown Reason`)
          .setTimestamp();
        await sails.helpers.guild.send(
          "kickLogChannel",
          inputs.member.guild,
          ``,
          {
            embed: kickedEmbedUnknown,
          }
        );
      }
    }, 1000);

    // send a log to the channel
    let leaveEmbed = new Discord.MessageEmbed()
      .setAuthor(
        `${inputs.member.user.tag}`,
        `${inputs.member.user.displayAvatarURL()}`
      )
      .setTitle(`:wave: Member left the guild.`)
      .addField(
        `Time Spent in Guild`,
        `${moment
          .duration(
            moment().diff(moment(inputs.member.joinedAt)),
            "milliseconds"
          )
          .format()}`
      )
      .addField(`Moderation Logs on Record`, `${modLogs.length}`)
      .setFooter(`User ID: ${inputs.member.user.id}`)
      .setColor(`#00b8ff`)
      .setTimestamp();
    await sails.helpers.guild.send("leaveLogChannel", inputs.member.guild, ``, {
      embed: leaveEmbed,
    });

    // Finalize any bans if the member has them
    // TODO
    // await sails.helpers.member.applyBans(inputs.member);

    // Remove any invites created by the member; this helps prevent raids (user enters guild, creates invite, leaves, stages raid with the invite)

    // TODO
    /*
    inputs.member.guild.fetchInvites().then((invites) => {
      invites
        .filter(
          (invite) =>
            typeof invite.inviter === "undefined" ||
            invite.inviter === null ||
            invite.inviter.id === inputs.member.id
        )
        .each(async (invite) => {
          await sails.helpers.guild.send(
            "eventLogChannel",
            inputs.member.guild,
            `:wastebasket: The invite ${invite.code} was deleted because an inviter did not exist. They probably left the guild.`
          );
        });
    });
    */

    // Remove any of the member's purchased advertisements
    // TODO
    /*
    inputs.member.guild.ads
      .filter((ad) => ad.userID === inputs.member.id)
      .map((ad) => Caches.get("ads").delete(ad.id));
      */

    // Delete any open support channels created by the member immediately
    // TODO
    /*
    inputs.member.guild.channels.cache
      .filter(
        (channel) =>
          channel.type === "text" &&
          inputs.member.guild.settings.incidentsCategory &&
          channel.parentID === inputs.member.guild.settings.incidentsCategory &&
          channel.name.startsWith("support-") &&
          channel.topic.includes(` ${inputs.member.id} `)
      )
      .map((channel) => channel.delete(`Member left the guild`));
      */

    // Post in other incidents channels
    // TODO
    /*
    inputs.member.guild.channels.cache
      .filter(
        (channel) =>
          channel.type === "text" &&
          inputs.member.guild.settings.incidentsCategory &&
          channel.parentID === inputs.member.guild.settings.incidentsCategory &&
          channel.topic.includes(` ${inputs.member.id} `)
      )
      .map((channel) =>
        channel.send(`:wave: Member <@${inputs.member.id}> left the guild.`)
      );
      */

    // Post in general if the member left within 1 hour of joining
    // TODO
    /*
    if (
      moment().subtract(1, "hours").isBefore(moment(inputs.member.joinedAt))
    ) {
      await sails.helpers.guild.send(
        "generalChannel",
        inputs.member.guild,
        `:frowning: O-oh, <@${inputs.member.user.id}> did not want to stay after all.`
      );
    }
    */
  },
};
