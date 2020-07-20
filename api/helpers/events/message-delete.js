module.exports = {
  friendlyName: "events.inputs.messageDelete",

  description: "Discord inputs.message delete handler",

  inputs: {
    message: {
      type: "ref",
      required: true,
      description: "The message deleted",
    },
  },

  fn: async function (inputs) {
    // If the inputs.message is a partial, we can't do anything.
    if (inputs.message.partial) {
      // TODO: bot error log this
      return;
    }

    // TODO: find a way to log uncached messages, perhaps from raw events

    // Skip the bot
    if (inputs.message.author.id === Client.user.id) return;

    // Set a 1 second timeout to allow audit logs to process
    setTimeout(async () => {
      // Find out who deleted the inputs.message
      // Find out who kicked the member if they were kicked
      const fetchedLogs = await inputs.message.guild.fetchAuditLogs({
        limit: 5,
        type: "MESSAGE_DELETE",
      });
      var auditLog = fetchedLogs.entries.find(
        (entry) => entry.target.id === inputs.message.id
      );

      // TODO

      // Remove XP/coins
      // await sails.helpers.xp.removeMessage(inputs.message);

      // Remove all rep earned from reactions, if any.
      // await sails.helpers.reputation.removeAll(inputs.message);

      // Remove all starboard
      // await sails.helpers.starboard.remove(inputs.message);

      // Create an embed for the event log channel
      var display = new Discord.MessageEmbed()
        .setTitle(`:wastebasket: A message was deleted`)
        .setDescription(`${inputs.message.cleanContent}`)
        .setAuthor(
          `${inputs.message.author.tag}`,
          `${inputs.message.author.displayAvatarURL()}`
        )
        .setColor(`#d81b60`)
        .setTimestamp()
        .setFooter(
          `Channel: ${
            inputs.message.channel.parent
              ? `${inputs.message.channel.parent.name} -> `
              : ``
          }${inputs.message.channel.name} | Channel ID: ${
            inputs.message.channel.id
          } | Message ID: ${inputs.message.id}`
        );
      if (auditLog) {
        display.setFooter(
          `Deleted by ${auditLog.executor.tag} | User ID: ${
            auditLog.executor.id
          } | Channel: ${
            inputs.message.channel.parent
              ? `${inputs.message.channel.parent.name} -> `
              : ``
          }${inputs.message.channel.name} | Channel ID: ${
            inputs.message.channel.id
          } | Message ID: ${inputs.message.id}`,
          `${auditLog.executor.displayAvatarURL()}`
        );
      }

      // Write attachment URLs
      inputs.message.attachments.array().map((attachment) => {
        display.addField(`Contained Attachment`, JSON.stringify(attachment));
      });
      // Write embeds as JSON
      inputs.message.embeds.map((embed) => {
        display.addField(`Contained Embed`, JSON.stringify(embed));
      });

      await sails.helpers.guild.send(
        "messageLogChannel",
        inputs.message.guild,
        ``,
        { embed: display }
      );
    }, 1000);
  },
};
