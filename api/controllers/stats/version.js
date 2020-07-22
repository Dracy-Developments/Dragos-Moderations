var pjson = require("../../../package.json");

module.exports = {
  friendlyName: "Version",

  description: "Get the current version of the bot.",

  inputs: {},

  exits: {},

  fn: async function (inputs) {
    return pjson.version;
  },
};
