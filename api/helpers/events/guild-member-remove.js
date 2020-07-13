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

    // Find out who kicked the member if they were kicked
    // TODO: Add discipline logs for kicks
    setTimeout(async () => {
      const fetchedLogs = await inputs.member.guild.fetchAuditLogs({
        limit: 1,
        type: "MEMBER_KICK",
      });
      var auditLog = fetchedLogs.entries.first();
      if (!auditLog || auditLog.target.id !== inputs.member.id)
        auditLog = undefined;

      // If the kick was executed by the bot
      if (auditLog && auditLog.executor.id === Client.user.id) {
        let kickedEmbedBot = new Discord.MessageEmbed()
          .setAuthor(
            `Drago's Moderation - User Kicked`,
            `${Client.user.displayAvatarURL()}`
          )
          .setDescription(
            `:athletic_shoe: A member was kicked from the guild by the bot.`
          )
          .setColor(`#DC3545`)
          .addField(
            `User Kicked`,
            `<@${inputs.member.id}> (${inputs.member.user.tag} / ${inputs.member.id})`
          )
          .addField(
            `Reason for Kick`,
            `${auditLog.reason ? auditLog.reason : `Unspecified or Unknown`}`
          )
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
        // The ban was executed by someone else, either another bot or a member via Discord's ban
        let kickedEmbed = new Discord.MessageEmbed()
          .setAuthor(
            `Drago's Moderation - User Kicked`,
            `${Client.user.displayAvatarURL()}`
          )
          .setDescription(`:athletic_shoe: A user was kicked from the guild.`)
          .setColor(`#DC3545`)
          .addField(
            `User Kicked`,
            `<@${inputs.member.id}> (${inputs.member.user.tag} / ${inputs.member.id})`
          )
          .addField(
            `Kicked By`,
            `<@${auditLog.executor.id}> (${auditLog.executor.tag} / ${auditLog.executor.id})`
          )
          .addField(
            `Reason for Kick`,
            `${auditLog.reason ? auditLog.reason : `Unspecified or Unknown`}`
          )
          .setTimestamp();
        await sails.helpers.guild.send(
          "kickLogChannel",
          inputs.member.guild,
          ``,
          {
            embed: kickedEmbed,
          }
        );
      } else {
        // We do not know who executed the ban
        let kickedEmbedUnknown = new Discord.MessageEmbed()
          .setAuthor(
            `Drago's Moderation - User Kicked`,
            `${Client.user.displayAvatarURL()}`
          )
          .setDescription(`:athletic_shoe: A user was kicked from the guild.`)
          .setColor(`#DC3545`)
          .addField(
            `User Kicked`,
            `<@${inputs.member.id}> (${inputs.member.user.tag} / ${inputs.member.id})`
          )
          .addField(`Kicked By`, `Unknown`)
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
        `Drago's Moderation - User Left the Guild`,
        `${Client.user.displayAvatarURL()}`
      )
      .setDescription(`:wave: A member left the guild.`)
      .addField(
        `User Who Left`,
        `<@${inputs.member.id}> (${inputs.member.user.tag} / ${inputs.member.id})`
      )
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