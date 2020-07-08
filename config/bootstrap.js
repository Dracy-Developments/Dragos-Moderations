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
      Error.captureStackTrace(this, ErrorWithImage)
    }
    this.helperImage = helperImage;
  }
}

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

  // Client
  class DiscordClient extends Discord.Client {
    constructor(options = {}) {
      super(options);

      sails.models.clients.findOrCreate({ id: 1 }, { id: 1 }).exec(() => {});
    }

    // Client settings
    async settings() {
      return sails.models.clients.findOne({ id: 1 });
    }
  }

  // Guilds
  Discord.Structures.extend("Guild", (Guild) => {
    class CoolGuild extends Guild {
      constructor(client, data) {
        super(client, data);

        // Initialize the guild settings
        sails.models.guilds
          .findOrCreate({ guildID: this.id }, { guildID: this.id })
          .exec(() => {});
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

  // Load Discord globals and initialize Discord client
  Discord.DiscordMenu = require("../util/DiscordMenu");
  global["Client"] = new DiscordClient(
    sails.config.custom.discord.clientOptions
  );

  // Initialize Client event handlers (every Discord.js event is handled in a sails.helpers.events file)
  if (sails.helpers.events) {
    for (var event in sails.helpers.events) {
      if (Object.prototype.hasOwnProperty.call(sails.helpers.events, event)) {
        // Needs to be in a self-calling function to provide the proper value of event
        let temp = (async (event2) => {
          // ready should only ever fire once whereas other events should be allowed to fire multiple times.
          if (["ready"].indexOf(event2) !== -1) {
            Client.once(event2, async (...args) => {
              await sails.helpers.events[event2](...args);
            });
          } else {
            Client.on(event2, async (...args) => {
              await sails.helpers.events[event2](...args);
            });
          }
        })(event);
      }
    }
  }

  // Start the Discord bot
  Client.login(sails.config.custom.discord.token);

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
