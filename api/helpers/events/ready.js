module.exports = {
  friendlyName: "sails.helpers.events.ready",

  description: "DiscordClient ready event.",

  inputs: {},

  fn: async function (inputs) {
    sails.log.debug(`Discord is ready!`);

    // Send a message to the owner in DM telling them the bot was started.
    if (sails.config.custom.discord.clientOwner) {
      var owner = Client.users.resolve(sails.config.custom.discord.clientOwner);
      if (owner) {
        owner.send(`:arrows_counterclockwise: The bot has been rebooted.`);
      }
    }

    // Iterate through all cached guilds
    var clientSettings = await sails.models.clients.findOne({id: 1});
    Client.guilds.cache.each(async (guild) => {
      // Kick self if the guild is black listed
      if (!guild.available) return;
      if (clientSettings.blacklisted.includes(guild.id)) {
        guild.leave();
        sails.log.warn(
          `Blacklisted guild detected: ${guild.name} [${guild.id}]. Bot left.`
        );
        return;
      }
    });
  },
};
