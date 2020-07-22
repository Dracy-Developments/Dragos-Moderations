module.exports = {
  friendlyName: "Members",

  description: "Get the number of guild members cached by the bot.",

  inputs: {},

  exits: {},

  fn: async function (inputs) {
    if (Client.shard) {
      var _members = await Client.shard.broadcastEval((client) => {
        var members = 0;
        client.guilds.cache.map((guild) => (members += guild.memberCount));
        return members;
      });
      _members = _members.reduce((prev, val) => prev + val, 0);
      return _members;
    } else {
      Client.guilds.cache.map((guild) => (members += guild.memberCount));
    }
    return members;
  },
};
