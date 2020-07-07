/**
 * Profiles.js
 *
 * @description :: Profile information for each guild member.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    guildID: {
      type: 'string',
      required: true,
      unique: true,
      description: "The ID of the guild these member settings belong to."
    },

    userID: {
      type: 'string',
      required: true,
      unique: true,
      description: "The ID of the user in the guild these settings belong to."
    },

  },

};

