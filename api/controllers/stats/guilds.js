module.exports = {
  friendlyName: "Guilds",

  description: "Get the number of guilds the bot is currently in.",

  inputs: {},

  exits: {},

  fn: async function (inputs) {
    if (Client.shard) {
      var _guilds = await Client.shard.broadcastEval((client) => {
        return client.guilds.cache.size;
      });
      _guilds = _guilds.reduce((prev, val) => prev + val, 0);
      return _guilds;
    } else {
      return Client.guilds.cache.size;
    }
  },
};
