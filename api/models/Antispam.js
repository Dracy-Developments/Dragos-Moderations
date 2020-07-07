/**
 * Antispam.js
 *
 * @description :: Guild antispam system
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

    /*
      BASIC SETTINGS
      */

    enabled: {
      type: "boolean",
      defaultsTo: false,
      description: "Is the antispam system enabled for this guild?",
    },

    threshold: {
      type: "number",
      defaultsTo: 100,
      description:
        "The number of spamScore at which a member is nudged/mentioned by the bot to stop spamming. If they continue, they will be auto-modded.",
    },

    decayFast: {
      type: "number",
      isInteger: true,
      defaultsTo: 33,
      min: 0,
      description:
        "The number of spamScore removed per minute from a member spamScoreFast.",
    },

    decaySlow: {
      type: "number",
      isInteger: true,
      defaultsTo: 1,
      min: 0,
      description:
        "The number of spamScore removed per minute from a member spamScoreSlow.",
    },
  },
};
