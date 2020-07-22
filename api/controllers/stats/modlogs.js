module.exports = {
  friendlyName: "Modlogs",

  description: "Get the number of moderation logs.",

  inputs: {},

  exits: {},

  fn: async function (inputs) {
    return await sails.models.moderation.count();
  },
};
