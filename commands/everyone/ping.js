const {
    MessageEmbed,
} = require(`discord.js`);

module.exports = {
    name: "ping",
    aliases: [``],
    run: async (client, message) => {


        const embed = new MessageEmbed()
            .setTitle(`🐉 Flying...`);
        const msg = await message.channel.send(embed);
        const api = `${Math.round(client.ws.ping)}ms`;
        const uembed = new MessageEmbed()
            .setTitle(`🏓 Pong!`)
            .setImage(`https://cdn.discordapp.com/attachments/645319050368647241/714630667131945010/tenor.gif`)
            .addField(`API`, `${api}`)
            .addField(`Latency`, `${msg.createdAt - message.createdAt}`)
            .setColor(0x36393e);
        msg.edit(uembed);
    },
};