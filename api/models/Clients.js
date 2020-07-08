/**
 * Clients.js
 *
 * @description :: Settings for the Discord client (that can be changed without rebooting, unlike custom.js and local.js).
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    blacklisted: {
      type: "json",
      defaultsTo: [],
      description: "An array of guild IDs blacklisted from using the bot.",
    },

    maintenanceMode: {
      type: "boolean",
      defaultsTo: false,
      description: "If true, the bot cannot ban or kick anyone.",
    },
  },
};
