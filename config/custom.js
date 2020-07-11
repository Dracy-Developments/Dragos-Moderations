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
          "GUILD_MESSAGE_REACTIONS"
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
  },

  baseURL: `https://example.com`, // Base URL for the REST API

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
