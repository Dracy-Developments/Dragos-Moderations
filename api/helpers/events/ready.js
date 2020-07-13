module.exports = {
  friendlyName: "sails.helpers.events.ready",

  description: "DiscordClient ready event.",

  inputs: {},

  fn: async function (inputs) {
    sails.log.debug(`Discord is ready!`);

    // Get client settings
    var clientSettings = await Client.settings();

    // Bot log
    const readyEmbed = new Discord.MessageEmbed()
      .setTitle(`[LOG] The Drago's Moderation is Running`)
      .addField(`Bot:`, `${Client.user.username}`)
      .addField(`Started On:`, `${Client.readyAt}`)
      .addField(`Guild Count:`, `${Client.guilds.cache.size}`)
      .addField(
        `Guilds`,
        `\`\`\`${Client.guilds.cache.map((m) => m.name).join(`\n`)}\`\`\``
      )
      .setFooter(`Credits TO LostNuke`)
      .setColor(0x36393e)
      .setThumbnail(
        `https://cdn.discordapp.com/emojis/715650351339929660.gif?v=1`
      );
    var channel = Client.channels.resolve(clientSettings.botLogChannel);
    if (channel) channel.send(readyEmbed);

    Client.user.setPresence({
      activity: {
        name: "Myself get developed",
        type: `WATCHING`,
      },
      status: "dnd",
    });

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
