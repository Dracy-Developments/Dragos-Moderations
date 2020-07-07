/**
 * Rules.js
 *
 * @description :: Guild rules.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    guildID: {
      type: "string",
      required: true,
      unique: true,
      description: "The guild ID this rule belongs to.",
    },

    number: {
      type: "number",
      required: true,
      description: "The rule number.",
    },

    short: {
      type: "string",
      required: true,
      maxLength: 255,
      description:
        "The short version / description of this rule; used in quick rule lists and discipline selection.",
    },

    long: {
      type: "string",
      allowNull: true,
      description:
        "The long / extended description or information for this rule.",
    },
  },
};
