/**
 * Seed Function
 * (sails.config.bootstrap)
 *
 * A function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also create a hook.
 *
 * For more information on seeding your app with fake data, check out:
 * https://sailsjs.com/config/bootstrap
 */

// Extend Javascript's default Error structure in a new Error class for errors with a helper image
class ErrorWithImage extends Error {
  constructor(helperImage, ...args) {
    super(...args);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ErrorWithImage);
    }
    this.helperImage = helperImage;
  }
}
global["ErrorWithImage"] = ErrorWithImage;

// Load discord
global["Discord"] = require("discord.js");

// Schedules cache
global["Schedules"] = {};

// Load moment model for date/time manipulation and processing; include timezone support
global["moment"] = require("moment-timezone");
require("moment-duration-format");

// Used in raid detection for detecting how similar two strings are.
const stringSimilarity = require("string-similarity");

module.exports.bootstrap = async function () {
  // Set default timezone to UTC
  moment.tz.setDefault("UTC");

  /*
    INIT CACHES AND STRUCTURES
*/

  // Guilds
  Discord.Structures.extend("Guild", (Guild) => {
    class CoolGuild extends Guild {
      constructor(client, data) {
        super(client, data);

        // Initialize the guild settings
        sails.models.guilds
          .findOrCreate({ guildID: this.id }, { guildID: this.id })
          .exec((err, record, wasCreated) => {
            // New guild; we do this here instead of guild create so it works if someone adds Drago to their guild when it was offline.
            if (wasCreated && this.me) {
              let channel = this.channels.cache
                .sort((a, b) => {
                  // Channels without a parent always come first.
                  if (!a.parent && b.parent) return -1;
                  if (!b.parent && a.parent) return 1;

                  // If both channels do not have a parent, use positioning.
                  if (!a.parent && !b.parent) return a.position - b.position;

                  if (a.parent && b.parent) {
                    // If both channels do have a parent, but the parents are not the same, use position of the parent.
                    if (a.parentID !== b.parentID) return a.parent.position - b.parent.position;

                    // If both channels have the same parent, use inner position.
                    if (a.parentID === b.parentID) return a.position - b.position;
                  }
                })
                .find(
                  (chan) =>
                    chan.type === "text" &&
                    chan.permissionsFor(this.me).has("SEND_MESSAGES") &&
                    chan
                      .permissionsFor(this.roles.everyone)
                      .has("SEND_MESSAGES")
                );
              if (channel) {
                let newGuild = new Discord.MessageEmbed()
                  .setTitle(`Thank you for adding me!`)
                  .setDescription(
                    `Howdy! I'm Drago, Drago the Dragon! Hmm... you're new to Drago's moderation, aren'tcha? Golly, you must be so excited. Someone ought to teach you how things work around here. I guess little old me will have to do!`
                  )
                  .setURL(`${sails.config.custom.baseURL}`)
                  .addField(
                    `Getting Started`,
                    `To get started setting me up, click the title link to read the getting started guide!`
                  )
                  .addField(
                    `Commands / Prefix`,
                    `* My default prefix is **${sails.config.custom.discord.defaultPrefix}**. You can change it with **${sails.config.custom.discord.defaultPrefix}prefix**. Also, remember you need to separate command parameters with " | " or a double space.`
                  )
                  .setColor(`#8800FF`)
                  .setThumbnail(
                    `${sails.config.custom.baseURL}/assets/images/setup/welcome.png`
                  )
                  .setTimestamp();
                channel.send(newGuild);
              }
            }
          });
        sails.models.antiraid
          .findOrCreate({ guildID: this.id }, { guildID: this.id })
          .exec(() => {});
        sails.models.antispam
          .findOrCreate({ guildID: this.id }, { guildID: this.id })
          .exec(() => {});
      }

      // per-guild settings
      async settings() {
        return sails.models.guilds.findOne({ guildID: this.id });
      }

      // Antiraid system
      async antiraid() {
        return sails.models.antiraid.findOne({ guildID: this.id });
      }

      // Antispam system
      async antispam() {
        return sails.models.antispam.findOne({ guildID: this.id });
      }

      // Per-guild rules
      async rules() {
        return sails.models.rules.find({ guildID: this.id });
      }

      // Guild moderation logs
      async moderation() {
        return sails.models.moderation.find({ guildID: this.id });
      }
    }

    return CoolGuild;
  });

  // Guild members
  Discord.Structures.extend("GuildMember", (GuildMember) => {
    class CoolGuildMember extends GuildMember {
      constructor(client, data, guild) {
        super(client, data, guild);

        // Initialize the guild members
        sails.models.members
          .findOrCreate(
            { guildID: this.guild.id, userID: this.id },
            { guildID: this.guild.id, userID: this.id }
          )
          .exec(() => {});
        sails.models.profiles
          .findOrCreate(
            { guildID: this.guild.id, userID: this.id },
            { guildID: this.guild.id, userID: this.id }
          )
          .exec(() => {});
      }

      // Per-member settings
      async settings() {
        return sails.models.members.findOne({
          guildID: this.guild.id,
          userID: this.id,
        });
      }

      // Member profiles
      async profile() {
        return sails.models.profiles.findOne({
          guildID: this.guild.id,
          userID: this.id,
        });
      }

      // Member moderation logs
      async moderation() {
        return sails.models.moderation.find({
          guildID: this.guild.id,
          userID: this.id,
        });
      }
    }

    return CoolGuildMember;
  });

  // Users (MUST be included with GuildMember, or these properties cannot be accessed once someone leaves the guild)
  Discord.Structures.extend("User", (User) => {
    class CoolUser extends User {
      constructor(client, data) {
        super(client, data);
      }

      async guildSettings(guildID) {
        return sails.models.members.findOne({
          guildID: guildID,
          userID: this.id,
        });
      }

      async guildProfile(guildID) {
        return sails.models.profiles.findOne({
          guildID: guildID,
          userID: this.id,
        });
      }

      async guildModeration(guildID) {
        return sails.models.moderation.find({
          guildID: guildID,
          userID: this.id,
        });
      }
    }

    return CoolUser;
  });

  /*
    DISCORD
*/

  // Initialize client settings
  await sails.models.clients.findOrCreate({ id: 1 }, { id: 1 });

  // Load Discord globals and initialize Discord client
  Discord.DiscordMenu = require("../util/DiscordMenu");
  global["Client"] = new Discord.Client(
    sails.config.custom.discord.clientOptions
  );

  // Initialize Client event handlers (every Discord.js event is handled in a sails.helpers.events file)
  if (sails.helpers.events) {
    for (var event in sails.helpers.events) {
      if (Object.prototype.hasOwnProperty.call(sails.helpers.events, event)) {
        // Needs to be in a self-calling function to provide the proper value of event
        let temp = (async (event2) => {
          Client.on(event2, async (...args) => {
            await sails.helpers.events[event2](...args);
          });
        })(event);
      }
    }
  }

  // Start the Discord bot
  Client.login(sails.config.custom.discord.token);

  // If sharding, change the baseURL
  if (Client.shard) {
    sails.log.debug(
      `Discord sharding activated; changed baseURL to ${sails.config.custom.baseURL}/shard/${Client.shard.ids[0]}`
    );
    sails.config.custom.baseURL = `${sails.config.custom.baseURL}/shard/${Client.shard.ids[0]}`;
  }

  /*
      INITIALIZE SCHEDULES
  */

  // Initialize cron schedules
  var records = await sails.models.schedules.find();
  records.forEach(async (record) => {
    await sails.helpers.schedules.add(record);
  });
  await sails.models.schedules.findOrCreate(
    { uid: "SYS-MINUTELY" },
    { uid: "SYS-MINUTELY", task: "sysMinutely", cron: "0 * * * * *" }
  );
};
