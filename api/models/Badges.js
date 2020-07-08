/**
 * Badges.js
 *
 * @description :: Per-guild profile badges that can be earned or purchased.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    uid: {
      type: 'string',
      unique: true,
      required: true
    },

    active: {
      type: 'boolean',
      defaultsTo: true,
      description: "Can this badge be purchased / earned?"
    },

    guildID: {
      type: 'string',
      required: true,
      description: "Guild ID the badge belongs"
    },

    name: {
      type: 'string',
      required: true,
      description: "Name of the badge"
    },

    image: {
      type: 'string',
      required: true,
      description: "Name of the image file for the badge in uploads/badges/(guildID)"
    },

    howToEarn: {
      type: 'string',
      allowNull: true,
      description: "A description of how this badge is earned (if earned opposed to purchased)."
    },

    price: {
      type: 'number',
      min: 0,
      allowNull: true,
      description: "Number of coins required to purchase this badge (null: cannot be purchased and must be manually awarded by staff)"
    },
  },

};

