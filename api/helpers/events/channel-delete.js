module.exports = {
  friendlyName: "event.channelDelete",

  description: "Discord channel delete event",

  inputs: {
    channel: {
      type: "ref",
      required: true,
      description: "The channel that was deleted.",
    },
  },

  fn: async function (inputs) {
    // If the channel is a partial, we can't do anything.
    if (inputs.channel.partial) {
      // TODO: bot error log this
      return;
    }

    // Set a 1 second timeout to allow audit logs to process
    setTimeout(async () => {
      // Find out who deleted the channel
      const fetchedLogs = await inputs.channel.guild.fetchAuditLogs({
        limit: 5,
        type: "CHANNEL_DELETE",
      });
      var auditLog = fetchedLogs.entries.find((entry) => entry.target.id === inputs.channel.id);

      if (inputs.channel.guild && inputs.channel.type === "text") {
        // Initiate data variable
        var data = `ARCHIVE (cached messages only) of deleted text channel ${
          inputs.channel.name
        }, ID ${inputs.channel.id}\nCreated on ${moment(
          inputs.channel.createdAt
        ).format()}\nDeleted on ${moment().format()}\n\n`;

        // Iterate through the messages, sorting by ID, and add them to data
        var messages = inputs.channel.messages.cache;
        messages
          .array()
          .sort(function (a, b) {
            return a.id - b.id;
          })
          .map((message) => {
            // Write each message to data
            data += `+++Message by ${message.author.username}#${message.author.discriminator} (${message.author.id}), ID ${message.id}+++\n`;
            data += `-Time: ${moment(message.createdAt).format()}\n`;
            // Write attachment URLs
            message.attachments.array().map((attachment) => {
              data += `-Attachment: ${attachment.url}\n`;
            });
            // Write embeds as JSON
            message.embeds.map((embed) => {
              data += `-Embed: ${JSON.stringify(embed)}\n`;
            });
            // Write the clean version of the message content
            data += `${message.cleanContent}\n\n\n`;
          });

        // Create a buffer with the data
        var buffer = Buffer.from(data, "utf-8");

        // Send the buffer to the channel as a txt file
        var archiveEmbed = new Discord.MessageEmbed()
          .setTitle(`:speech_left: :wastebasket: A text channel was deleted.`)
          .addField(
            `Channel`,
            `${
              inputs.channel.parent ? `${inputs.channel.parent.name} -> ` : ``
            }${inputs.channel.name} (${inputs.channel.id})`
          )
          .setColor(`#d81b60`)
          .setTimestamp();
        if (auditLog) {
          archiveEmbed.setFooter(
            `Deleted by ${auditLog.executor.tag} | User ID: ${auditLog.executor.id}`,
            `${auditLog.executor.displayAvatarURL()}`
          );
        }
        await sails.helpers.guild.send(
          "channelLogChannel",
          inputs.channel.guild,
          ``,
          {
            files: [{ attachment: buffer, name: `${inputs.channel.name}.txt` }],
            embed: archiveEmbed,
          }
        );
      } else if (inputs.channel.guild) {
        var noArchiveEmbed = new Discord.MessageEmbed()
          .setTitle(
            `:speech_left: :wastebasket: A non-text channel was deleted.`
          )
          .addField(
            `Channel`,
            `${
              inputs.channel.parent ? `${inputs.channel.parent.name} -> ` : ``
            }${inputs.channel.name} (${inputs.channel.id})`
          )
          .setColor(`#d81b60`)
          .setTimestamp();
        if (auditLog) {
          noArchiveEmbed.setFooter(
            `Deleted by ${auditLog.executor.tag} | User ID: ${auditLog.executor.id}`,
            `${auditLog.executor.displayAvatarURL()}`
          );
        }
        await sails.helpers.guild.send(
          "channelLogChannel",
          inputs.channel.guild,
          ``,
          {
            embed: noArchiveEmbed,
          }
        );
      }
    }, 1000);
  },
};
