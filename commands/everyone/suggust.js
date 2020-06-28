const { MessageEmbed } = require(`discord.js`);

module.exports = {
    name: "suggest",
    aliases: [``],
    run: async (client, message, args) => {
        if(args[0]) {
            message.delete();
            const suggestion = new MessageEmbed()
            .setTitle(`New Suggestion for Drago's Moderation!`)
            .setColor("RANDOM")
            .setDescription(args.slice().join(" "))
            .setAuthor(`${message.author.username}`, `${message.author.displayAvatarURL({ dynamic: true })}`)
            .setThumbnail(`https://cdn.discordapp.com/emojis/726113039912403005.png?v=1`);
            message.channel.send(`☑️ Your Suggestion has Been posted`).then(m => m.delete({ timeout:5000 }));
            client.channels.cache.get(`722355084931104810`).send(suggestion).then(async m => {
                await m.react(`✅`);
                await m.react(`❌`);
            });
        }
else{
            const error = new MessageEmbed()
            .setTitle(`❌ Error`)
            .setDescription(`Please provide your suggustion \n\n Command Usage: J>suggest **<suggestion>** \n\n\n⚠ Make Sure your suggustion is descriptive as possible or else it will **__NOT__** be considered`);
            return message.channel.send(error);
        }
    },
};