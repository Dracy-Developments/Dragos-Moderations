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

// Load discord
global["Discord"] = require("discord.js");

// Load cache manager class
var CacheManager = require("../util/Cache");
global["Caches"] = new CacheManager();

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
  await Caches.new("client", ["id"]);
  class DiscordClient extends Discord.Client {
    constructor(options = {}) {
      super(options);

      Caches.get("clients").find([1]);
    }

    // Client settings
    get settings() {
      return Caches.get("clients").find([1]);
    }
  }

  // Guilds
  await Caches.new("guilds", ["guildID"]);
  await Caches.new("antiraid", ["guildID"]);
  await Caches.new("antispam", ["guildID"]);
  await Caches.new("rules", ["id"]);
  Discord.Structures.extend("Guild", (Guild) => {
    class CoolGuild extends Guild {
      constructor(client, data) {
        super(client, data);

        // Initialize the guild in the cache
        Caches.get("guilds").find([this.id]);
        Caches.get("antiraid").find([this.id]);
      }

      // per-guild settings
      get settings() {
        return Caches.get("guilds").find([this.id]);
      }

      // Antiraid system
      get antiraid() {
        return Caches.get("antiraid").find([this.id]);
      }

      // Antispam system
      get antispam() {
        return Caches.get("antispam").find([this.id]);
      }

      // Per-guild rules
      get rules() {
        return Caches.get("rules").collection.filter(
          (record) => record.guildID === this.id
        );
      }
    }

    return CoolGuild;
  });

  // Guild members
  await Caches.new("members", ["userID", "guildID"]);
  await Caches.new("profiles", ["userID", "guildID"]);
  await Caches.new("moderation", ["case"]);
  Discord.Structures.extend("GuildMember", (GuildMember) => {
    class CoolGuildMember extends GuildMember {
      constructor(client, data, guild) {
        super(client, data, guild);

        // Initialize the guild member in the cache
        Caches.get("members").find([this.id, this.guild.id]);
        Caches.get("profiles").find([this.id, this.guild.id]);
      }

      // Per-member settings
      get settings() {
        return Caches.get("members").find([this.id, this.guild.id]);
      }

      get profile() {
        return Caches.get("profiles").find([this.id, this.guild.id]);
      }

      get moderation() {
        return Caches.get("moderation").collection.filter(
          (record) =>
            record.userID === this.id && record.guildID === this.guild.id
        );
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

      guildSettings(guildID) {
        return Caches.get("members").find([this.id, guildID]);
      }

      guildProfile(guildID) {
        return Caches.get("profiles").find([this.id, guildID]);
      }

      guildModeration(guildID) {
        return Caches.get("moderation").collection.filter(
          (record) => record.userID === this.id && record.guildID === guildID
        );
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
