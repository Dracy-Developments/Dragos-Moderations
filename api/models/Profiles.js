/**
 * Profiles.js
 *
 * @description :: Profile information for each guild member.
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

    title: {
      type: 'string',
      maxLength: 64,
      columnType: "varchar(64)",
      allowNull: true,
      description: "A motto / phrase that appears below the member's username."
    },

    image: {
      type: 'string',
      allowNull: true,
      description: "An image file used for the member's profile cover, located in uploads/profileImages/(guildID)/(userID)"
    },

    badges: {
      type: 'json',
      description: 'Array of objects of badges earned by the member: {id: badge uid, acquired: date/time earned}.'
    },

    reputation: {
      type: 'number',
      defaultsTo: 0,
      description: "The number of reputation points this member has."
    },

    socialMedia: {
      type: 'json',
      description: `An array of social media for the user. {icon: "fontawesome icon classes", platform: "Name", URL: "https://platform.com/username"}`
    },

    information: {
      type: 'string',
      maxLength: 4096,
      columnType: "varchar(4096)",
      description: "Additional profile information provided by the member, such as an introduction."
    }
  },
};
