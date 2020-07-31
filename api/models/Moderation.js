/**
 * Moderation.js
 *
 * @description :: Moderation cases
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    case: {
      type: "string",
      required: true,
      unique: true,
      description: "The case ID for this moderation log.",
    },

    guildID: {
      type: "string",
      required: true,
    },

    userID: {
      type: "string",
      required: true,
    },

    issuer: {
      type: "string",
      required: true,
      description: "The user ID of the person who issued this discipline.",
    },

    appealed: {
      type: "boolean",
      defaultsTo: false,
      description: "Whether or not this entire moderation log is appealed and should not count.",
    },

    rules: {
      type: "json",
      required: true,
      description:
        "An array of rule numbers that the member violated in this discipline.",
    },

    reason: {
      type: "string",
      maxLength: 1024,
      description:
        "The full explanation of what the user did warranting this action.",
    },

    discipline: {
      collection: "Discipline",
      via: "case",
    },
  },
};
