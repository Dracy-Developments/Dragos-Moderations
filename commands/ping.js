const { MessageEmbed } = require(`discord.js`)

exports.run = async (client, message, args) => {
    const embed = new MessageEmbed()
    .setTitle(`🏓 Drago is Flying...`)
    let msg = await message.channel.send(embed)
    const ping = (Math.round((msg.createdTimestamp - message.createdTimestamp) - client.ws.ping)) + "ms" 
    const drago = `${client.user.avatarURL()}`
    const embed2 = new MessageEmbed()
    .setTitle(`🏓 Pong!`)
    .addField(`Pings:`, `${ping}`)
    .setThumbnail(drago)
    .setImage(`https://cdn.discordapp.com/attachments/697920541230891142/714309832865349632/tenor.gif`)
    msg.edit(embed2)
}