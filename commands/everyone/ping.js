const {
    MessageEmbed
} = require(`discord.js`)

module.exports = {
    name: "ping",
    aliases: [``],
    run: async (client, message, args) => {


        const embed = new MessageEmbed()
            .setTitle(`🐉 Flying...`)
        let msg = await message.channel.send(embed)
        let latency = ((msg.createdAt - message.createdAt) - client.ws.ping) + `ms`
        let api = `${client.ws.ping}ms`
        const uembed = new MessageEmbed()
            .setTitle(`🏓 Pong!`)
            .setImage(`https://cdn.discordapp.com/attachments/645319050368647241/714630667131945010/tenor.gif`)
            .addField(`API`, `${api}`)
            .addField(`Latency`, `${latency}`)
            .setColor(0x36393e)
        msg.edit(uembed)
    }
}