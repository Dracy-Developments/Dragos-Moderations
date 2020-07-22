/**
 * Custom configuration
 * (sails.config.custom)
 *
 * One-off settings specific to your application.
 *
 * For more information on custom configuration, visit:
 * https://sailsjs.com/config/custom
 */

module.exports.custom = {
  discord: {
    clientOptions: {
      // Discord.js clientOptions. You can override in local.js
      messageCacheMaxSize: 10000,
      messageCacheLifetime: 60 * 60 * 24 * 10,
      messageSweepInterval: 60 * 60,
      // fetchAllMembers: true,
      partials: ["USER", "MESSAGE", "CHANNEL", "GUILD_MEMBER", "REACTION"],
      ws: {
        intents: [
          "GUILDS",
          "GUILD_MESSAGES",
          "GUILD_MEMBERS",
          "GUILD_PRESENCES",
          "GUILD_MESSAGE_REACTIONS",
          "GUILD_BANS"
        ],
      },
    },

    regex: {
      userOrMember: /^(?:<@!?)?(\d{17,19})>?$/,
      channel: /^(?:<#)?(\d{17,19})>?$/,
      emoji: /^(?:<a?:\w{2,32}:)?(\d{17,19})>?$/,
      role: /^(?:<@&)?(\d{17,19})>?$/,
      snowflake: /^(\d{17,19})$/,
    },

    defaultPrefix: `J>`, // Default prefix for activating bot commands if not set in guild settings.
    token: ``, // Bot user token
    clientOwners: [], // Array of snowflake IDs of people considered owners of the bot
    suggestionsChannel: ``, // The ID of the channel suggestions will be posted from the suggestions command

    /*
      SHARDING

      * If you want to use sharding: you must run grunt cluster first, then run drago.js. For no sharding, run grunt cluster and then lift sails normally.

      * When sharding, a sails.js process will be created for each shard.

      * Be sure to add each IP:port into a load balancer such as NGINX so the traffic is distributed among each Sails process.

      shards: The TOTAL number of shards across all machines for this bot/application.
      startPort: The starting port number (ignored if running index.js or lifting sails normally); sails will run on this port + shard ID number.
      startShard: Starting shard ID number for this machine. If this is the first or only machine, this should be 0.
      shardLimit: Limit the number of shards to spawn on this machine to this number. 0 = spawn all shards on this machine.
    */
    shards: 1,
    startPort: 6900,
    startShard: 0,
    shardLimit: 0,
  },

  baseURL: 'https://example.com', // The base URL for sails.js without a trailing slash or any query strings

  supportInvite: '', // A permanent invite link to the bot support server

  // sails.helpers.sanitize (sanitize-html options)
  sanitize: {

    // Used for TinyMCE such as profile information
    tinymce: {
      allowedTags: [
        "h5",
        "h6",
        "blockquote",
        "p",
        "a",
        "ul",
        "ol",
        "nl",
        "li",
        "b",
        "i",
        "strong",
        "em",
        "strike",
        "code",
        "hr",
        "br",
        "u",
        "s",
        "span",
      ],
      allowedAttributes: {
        a: ["href", "name", "target"],
        span: ["style"],
      },
      allowedStyles: {
        span: {
          // Match HEX and RGB
          color: [
            /^#(0x)?[0-9a-f]+$/i,
            /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/,
          ],
        },
      },
      selfClosing: [
        "br",
        "hr",
        "area",
        "base",
        "basefont",
        "input",
        "link",
        "meta",
      ],
      // URL schemes we permit
      allowedSchemes: ["http", "https"],
      allowedSchemesByTag: {},
      allowedSchemesAppliedToAttributes: ["href", "src", "cite"],
      allowProtocolRelative: true,
    },

    // Used to sanitize ALL html out
    textOnly: {
      allowedTags: [],
      allowedAttributes: {},
    },
  },
};
