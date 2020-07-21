module.exports = {
  friendlyName: "sails.helpers.events.ready",

  description: "DiscordClient ready event.",

  inputs: {},

  fn: async function (inputs) {
    sails.log.debug(`Discord is ready!`);

    // Get client settings
    var clientSettings = await sails.models.clients.findOne({ id: 1 });

    if (Client.shard) {
      Client.user.setPresence({
        activity: {
          name: `Your URL is ${sails.config.custom.baseURL}`,
          type: `PLAYING`,
        },
        shardID: Client.shard.ids
      });
    } else {
      Client.user.setPresence({
        activity: {
          name: `Your URL is ${sails.config.custom.baseURL}`,
          type: `PLAYING`,
        },
      });
    }

    // Set 5 second timeout to allow shard manager to report finished
    setTimeout(async () => {
      // Get number of guilds
      var guildSize = 0;
      try {
        if (Client.shard) {
          guildSize = await Client.shard.fetchClientValues("guilds.cache.size");
          guildSize = guilds.reduce((prev, guildCount) => prev + guildCount, 0);
        } else {
          guildSize = Client.guilds.cache.size;
        }
      } catch (e) {
        sails.log.verbose(`guilds.cache.size: sharding still in progress?`);
      }

      // Bot log
      const readyEmbed = new Discord.MessageEmbed()
        .setTitle(`[LOG] Bot started up!`)
        .addField(`Bot:`, `${Client.user.username}`)
        .addField(`Started On:`, `${Client.readyAt}`)
        .addField(`Total Guild Count:`, `${guildSize}`)
        .setFooter(`Credits TO LostNuke`)
        .setColor(0x36393e)
        .setThumbnail(
          `https://cdn.discordapp.com/emojis/715650351339929660.gif?v=1`
        );

      var channel = await Client.channels.fetch(clientSettings.botLogChannel);
      if (channel) channel.send(readyEmbed);
    }, 5000);

    // Iterate through all cached guilds
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
