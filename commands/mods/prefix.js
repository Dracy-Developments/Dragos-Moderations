const fs = require(`fs`);
const { MessageEmbed } = require(`discord.js`);

module.exports = {
    name: "prefix",
    aliases: [``],
    run: async (client, message, args) => {
        if(message.member.hasPermission(`MANAGE_MESSAGES`)) {
            if(args[0]) {
                const json = require(`../../data/guild/${message.guild.id}/settings.json`);
                console.log(JSON.stringify(json));
                json.prefix = args.slice(0).join(" ");
                fs.writeFileSync(`./data/guild/${message.guild.id}/settings.json`, JSON.stringify(json));

                const embed = new MessageEmbed()
                    .setTitle(`Changed Prefix`)
                    .setDescription(`The Prefix is now \`${json.prefix}\``)
                    .setColor(`#8800FF`);
                return message.channel.send(embed);
            }
            else{
                return message.channel.send(`❌ You need an a new prefix \n\nUsage: \`\`\`J>prefix <new prefix>\`\`\``);
            }


        }
        else{
            message.channel.send(`❌ You don't have Permission to do this.`);
        }
    },
};