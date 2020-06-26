/* eslint-disable no-empty */
/* eslint-disable no-trailing-spaces */
/* eslint-disable space-before-blocks */
const { trusted } = require(`./../../config.json`);
const ConfigManager = require(`./../../util/guildBanning`);

module.exports = {
    name: "test",
    aliases: [``],
    run: async (client, message, args) => {
        if(trusted.includes(message.author.id)){
            if(args[0] === "banned?"){
                return ConfigManager.isGuildBanned(message.guild.id) ? message.reply(`Ha Guild is Banned Bruh`) : message.reply(`Nah Fam Guild is GUCCI`);
            }
             if(args[1] === "ban"){
                ConfigManager.banGuild(message.author.id);
                return message.reply(`Banned ${message.guild.name}`);
            }
        }
        else {
            message.channel.send(`❌ You don't have Permission to do this`);
        }

    },
};
