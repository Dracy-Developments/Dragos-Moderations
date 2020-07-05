const { trusted } = require(`./../../config.json`);
const { MessageEmbed } = require(`discord.js`)

module.exports = {
    name: "settings",
    aliases: [``],
    run: async (client, message) => {
        if(trusted.includes(message.author.id)) {
            const json = require(`../../data/guild/${message.guild.id}/settings.json`)
            const embed = new MessageEmbed()
            .setTitle(`Settings - ${message.guild.name}`)
            .addField(`\u200b`, `**__Prefix__**\n${json.prefix}`, true)
            .addField(`\u200b`, `**__Mute Role__**\n${json.muteRole}`, true)
            .addField(`\u200b`, `**__Moderator Roles__**\n${json.moderators.join(" ")}`, true)
            .addField(`\u200b`, `**__Adminstrators Roles__**\n${json.adminstrators.join(" ")}`, true)
            .setColor(`#8800FF`)
            .setThumbnail(`https://discord.com/assets/a6d05968d7706183143518d96c9f066e.svg`)
            .setTimestamp()
            .setFooter(`Settings of the server was requested by ${message.author.username}`)
            message.channel.send(embed)

        }
        else{
            message.channel.send(`❌ You don't have Permission to do this.`);
        }
    },
};