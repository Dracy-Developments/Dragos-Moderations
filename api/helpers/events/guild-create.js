module.exports = {
  friendlyName: "events.guildCreate",

  description: "Discord guild create event",

  inputs: {
    guild: {
      type: "ref",
      required: true,
      description: "The guild created",
    },
  },

  fn: async function (inputs) {
    var clientSettings = await sails.models.clients.findOne({ id: 1 });
    // Kick self if the guild is black listed
    if (!inputs.guild.available) return;
    if (clientSettings.blacklisted.includes(guild.id)) {
      inputs.guild.leave();
      sails.log.warn(
        `Blacklisted guild detected: ${guild.name} [${guild.id}]. Bot left.`
      );
      // TODO: Add a bot log error
      return;
    }
  },
};
