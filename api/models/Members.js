/**
 * Members.js
 *
 * @description :: Guild member settings.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    guildID: {
      type: "string",
      required: true,
      unique: true,
      description: "The ID of the guild these member settings belong to.",
    },

    userID: {
      type: "string",
      required: true,
      unique: true,
      description: "The ID of the user in the guild these settings belong to.",
    },

    /*
      BASIC SETTINGS
      */

    vpts: {
      type: "number",
      isInteger: true,
      defaultsTo: 0,
      min: 0,
      description:
        "The number of violation points currently against the member.",
    },

    roles: {
      type: "json",
      description:
        "An array of role IDs the member was last known to have when not muted / punished.",
    },

    spamScoreFast: {
      type: "number",
      defaultsTo: 0,
      description:
        "Spam score for anti-raid / anti-spam features. This number decays quickly.",
    },

    spamScoreSlow: {
      type: "number",
      defaultsTo: 0,
      description:
        "Spam score for anti-raid / anti-spam features. This number decays slowly.",
    },

    spamScoreStamp: {
      type: "string",
      defaultsTo: moment().toISOString(true),
      description:
        "Date/time when the member last received a nudge by the bot for spam.",
    },

    muted: {
      type: "boolean",
      defaultsTo: false,
      description: "Whether or not the member is supposed to be muted.",
    },

    reports: {
      type: 'json',
      description: 'Array of objects of active self-moderation reports against this member: {user: userID, time: iso string}.'
    },

    XP: {
      type: 'number',
      defaultsTo: 0,
      description: "The amount of experience (XP) the member has."
    },

    coins: {
      type: 'number',
      defaultsTo: 0,
      description: "The number of coins the member has."
    }
  },
};
