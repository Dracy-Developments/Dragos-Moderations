const {
    MessageEmbed,
} = require("discord.js");

module.exports = {
        name: "credits",
        aliases: [``],
        run: async (client, message) => {

            const embed = new MessageEmbed()
                .setTitle(`Credits`)
                .setDescription(`Thanks to Everyone who is listed for helping out the Development of Drago's Moderation`)
                .addField(`\u200b`, `That Duck David#9502`)
                .addField(`\u200b`, `Shadowplays4k#6969`)
                .addField(`\u200b`, `LostNuke#9114`)
                .addField(`\u200b`, `codic#3754`)
                .addField(`\u200b`, `Chan#8808`)
                .setColor(`RANDOM`)
                .setFooter(`Bot Creator: Drago#2020`)
                .setThumbnail(`${client.user.displayAvatarURL()}`)
            message.channel.send(embed);
        },
    };