const { MessageEmbed } = require(`discord.js`);

module.exports = {
    name: "report",
    aliases: [``],
    run: async (client, message, args) => {
        if(args[0]) {
            if(args[1]) {
            if(args[2]) {
            message.delete();
            const report = new MessageEmbed()
            .setTitle(`New Report for Global Ban!`)
            .setColor("RANDOM")
            .addField(`Username`, `${args[0]}`)
            .addField(`UserID`, `${args[1]}`)
            .addField(`Reason`, `${args.slice(3).join(" ")}`)
            .addField(`Reporter`, `${message.author.username}`)
            .setAuthor(`${message.author.username}`, `${message.author.displayAvatarURL({ dynamic: true })}`)
            .setThumbnail(`https://cdn.discordapp.com/emojis/726113037244825675.png?v=1`);
            message.channel.send(`☑️ Your Global Ban Request has Been posted to the Staff Team`).then(m => m.delete({ timeout:5000 }));
            client.channels.cache.get(`722353242809303070`).send(`Evidence: ${args[2]}`)
            client.channels.cache.get(`722353242809303070`).send(report).then(async m => {
                await m.react(`✅`);
                await m.react(`❌`);
            });
            }
        }
        }
else{
            const error = new MessageEmbed()
            .setTitle(`❌ Error`)
            .setDescription(`Please provide **everything** for the report \n\n Command Usage: J>report <username(with tag numbers)> <userID> <screenshot/evidence url> <Reasons why this person should be globally banned> \n\n\n⚠ Make Sure your have everything in the parameters correctly or the embed will show up weird and it will not be consider`);
            return message.channel.send(error);
        }
    },
};