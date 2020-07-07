/**
 * Guilds.js
 *
 * @description :: Guild settings.
 */

module.exports = {
  attributes: {
    guildID: {
      type: "string",
      required: true,
      unique: true,
      description: "The ID of the guild",
    },

    /*
      BASIC SETTINGS
      */

    prefix: {
      type: "string",
      allowNull: true,
      description: "A custom bot prefix for the guild",
    },

    disabledCommands: {
      type: "json",
      description: "A list of command names that are disabled in this guild.",
    },

    // TODO: Muted is in members and mod logs

    /*
      ROLES
      */

    muteRole: {
      type: "string",
      allowNull: true,
      description: "The role used to mute a member",
    },

    botManagerRole: {
      type: "string",
      allowNull: true,
      description:
        "Bot manager role is a role assigned to members who can perform administrative functions on the bot",
    },

    botModRole: {
      type: "string",
      allowNull: true,
      description:
        "Bot manager role is a role assigned to members who can perform moderation functions on the bot",
    },

    verifiedRole: {
      type: "string",
      allowNull: true,
      description: "The role differentiating current members from new members.",
    },

    /*
      CHANNELS
      */

    banLogChannel: {
      type: "string",
      allowNull: true,
      description:
        "The channel where ban notifications for staff will be posted",
    },

    kickLogChannel: {
      type: "string",
      allowNull: true,
      description:
        "The channel where kick notifications for staff will be posted",
    },

    muteLogChannel: {
      type: "string",
      allowNull: true,
      description:
        "The channel where mute notifications for staff will be posted",
    },

    joinLogChannel: {
      type: "string",
      allowNull: true,
      description:
        "The channel where join notifications for staff will be posted",
    },

    leaveLogChannel: {
      type: "string",
      allowNull: true,
      description:
        "The channel where leave notifications for staff will be posted",
    },

    autoModLogChannel: {
      type: "string",
      allowNull: true,
      description:
        "The channel where auto moderation notifications for staff will be posted",
    },

    /*
      FEATURES
      */

    infractionSystem: {
      type: "string",
      isIn: ["warn", "strike", "vpts"],
      defaultsTo: "strike",
      description:
        "The infraction system to use in the guild. Warn = no auto-mod; staff discretion, strike = auto-mod system after x warns, vpts = auto-mod system after X violation points; each violation can be a different number of points.",
    },

    reputationSystem: {
      type: "boolean",
      defaultsTo: false,
      description:
        "Enable a reputation system where members can give each other rep points displayed on their profile.",
    },

    reputationEmoji: {
      type: "string",
      allowNull: true,
      description:
        "If set, members can earn rep for qualifying messages. Qualifying messages will be reacted with this emoji by the bot, and the author will get rep for each member who reacts this emoji.",
    },

    selfModeration: {
      type: "number",
      defaultsTo: 0,
      min: 0,
      isInteger: true,
      description:
        "The number of reports against a member within selfModerationMinutes before they are auto-muted by the bot. 0 = disable self moderation.",
    },

    selfModerationMinutes: {
      type: "number",
      defaultsTo: 60,
      min: 1,
      isInteger: true,
      description:
        "The number of minutes a self moderation report is valid against a member.",
    },

    // TODO: conflictSystem

    // TODO: ads
  },
};
