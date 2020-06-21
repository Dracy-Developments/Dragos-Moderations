const {
    MessageEmbed,
} = require(`discord.js`);

module.exports = {
        name: "subscribe",
        aliases: [``],
        run: async (client, message) => {
                if (message.guild.id === "722155065129041940") {
                    if (message.member.roles.cache.get(`724055629827932160`)) {
                        message.member.roles.remove(`724055629827932160`);
                        const embed = new MessageEmbed()
                            .setTitle(`You're No Longer Subscribed`)
                            .setThumbnail(`https://media.discordapp.net/attachments/681019737030787125/724062231943184444/tenor.gif?width=269&height=201`);
                        message.channel.send(embed);
                    }
 else if (!message.member.roles.cache.get(`724055629827932160`)) {
                            message.member.roles.add(`724055629827932160`);
                            const embed = new MessageEmbed()
                                .setTitle(`You're Now Subscribed`)
                                .setThumbnail(`https://media.discordapp.net/attachments/681019737030787125/724062231586930719/tenor2.gif?width=408&height=408`);
                            message.channel.send(embed);
                    }
else {
                        message.reply(`This Command is only Useable for the Support Server`);
                }
        }
    },
                };