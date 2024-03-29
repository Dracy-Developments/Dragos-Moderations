var jsdiff = require("diff");

module.exports = {
  friendlyName: "events.messageUpdate",

  description: "Discord message update event",

  inputs: {
    old: {
      type: "ref",
      required: true,
      description: "Old message",
    },
    message: {
      type: "ref",
      required: true,
      description: "New message",
    },
  },

  fn: async function (inputs) {
    // Upgrade partial messages to full messages
    if (inputs.message.partial) {
      await inputs.message.fetch();
    }

    // TODO
    // Reset cached calculated values; they must be re-calculated.
    // inputs.message.cachedSpamScore = null;
    // inputs.message.cachedXP = null;

    // First, update spam score if new score is bigger than old score. Do NOT update if new score is less than old score; we don't want to lower it.
    try {
      if (
        inputs.message.type === "DEFAULT" &&
        typeof inputs.message.member !== "undefined" &&
        inputs.message.member !== null
      ) {
        // var oldscore = inputs.old.spamScore || inputs.message.spamScore;
        // var newscore = inputs.message.spamScore;
        // if (newscore > oldscore) {
        // var diff = newscore - oldscore;
        // await sails.helpers.spam.add(inputs.message.member, diff, inputs.message);
        // }
      }

      // TODO
      if (
        typeof inputs.message.member !== "undefined" &&
        inputs.message.member !== null &&
        inputs.message.author.id !== Client.user.id
      ) {
        // Remove all reactions to reset reputation
        // inputs.message.reactions.removeAll();
        // var xp1 = inputs.old.XP || inputs.message.XP;
        // var xp2 = inputs.message.XP;
        // if (newscore > inputs.message.guild.settings.antispamCooldown) {
        // xp2 = 0;
        // Add rep emoji if 15 or more XP was assigned
        // } else if (
        // inputs.message.member &&
        // !inputs.message.author.bot &&
        // xp2 >= 15
        // ) {
        // inputs.message.react(inputs.message.guild.settings.repEmoji);
        // }
        // Change XP and credits
        // if (xp2 - xp1 !== 0) {
        // await sails.helpers.xp.change(inputs.message.member, xp2 - xp1);
        // }
      }
    } catch (e) {
      await sails.log.error(e);
      // TODO: bot error log
    }

    // Skip the bot for the remainder of the script
    if (inputs.message.author.id === Client.user.id) return;

    var display = new Discord.MessageEmbed()
      .setTitle(`:pencil: A message was edited`)
      .setDescription(
        `${inputs.old.partial ? `Unknown Message` : inputs.old.cleanContent}`
      )
      .setAuthor(
        `${inputs.message.author.tag}`,
        `${inputs.message.author.displayAvatarURL()}`
      )
      .setColor(`#6610f2`)
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

    var changes = false;

    // First, determine any attachment changes
    var oldAttachments = [];
    var newAttachments = [];

    if (!inputs.old.partial) {
      inputs.old.attachments.array().map((attachment) => {
        oldAttachments.push(attachment.url);
      });
    }

    inputs.message.attachments.array().map((attachment) => {
      newAttachments.push(attachment.url);
    });

    oldAttachments.map((attachment) => {
      if (newAttachments.indexOf(attachment.url) === -1) {
        display.addField(`Attachment removed`, JSON.stringify(attachment));
        changes = true;
      }
    });

    newAttachments.map((attachment) => {
      if (oldAttachments.indexOf(attachment.url) === -1) {
        display.addField(`Attachment added`, JSON.stringify(attachment));
        changes = true;
      }
    });

    // Next, determine embed changes

    var oldEmbeds = [];
    var newEmbeds = [];

    if (!inputs.old.partial) {
      inputs.old.embeds.map((embed) => {
        oldEmbeds.push(JSON.stringify(embed));
      });
    }

    inputs.message.embeds.map((embed) => {
      newEmbeds.push(JSON.stringify(embed));
    });

    oldEmbeds.map((embed) => {
      if (newEmbeds.indexOf(embed) === -1) {
        display.addField(`Embed removed`, embed);
        changes = true;
      }
    });

    newEmbeds.map((embed) => {
      if (oldEmbeds.indexOf(embed) === -1) {
        display.addField(`Embed added`, embed);
        changes = true;
      }
    });

    // Get the differences between old and new content
    var diff = jsdiff.diffSentences(
      inputs.old.partial ? `` : inputs.old.cleanContent,
      inputs.message.cleanContent
    );
    diff.map(function (part) {
      if (part.added) {
        changes = true;
        display.addField(`Added`, part.value);
      } else if (part.removed) {
        changes = true;
        display.addField(`Removed`, part.value);
      }
    });

    // send a log to the channel
    if (changes) {
      await sails.helpers.guild.send(
        "messageLogChannel",
        inputs.message.guild,
        ``,
        { embed: display }
      );
    }
  },
};
