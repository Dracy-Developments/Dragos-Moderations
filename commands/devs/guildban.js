const { trusted } = require(`./../../config.json`);
const ConfigManager = require(`../../util/guildBanning`);
module.exports = {
    name: "guildBan",
    aliases: [`gban`],
    run: async (client, message, args) => {
        if(trusted.includes(message.author.id)) {
            if(client.guilds.cache.get(args[0])) {
                ConfigManager.banGuild(args[0]);
                return message.channel.send(`🔨 Banned ${message.guild.name}`);
            }
else{
                return message.channel.send(`Please Specify Guild ID`);
            }
    }
else{
        message.channel.send(`❌ You don't have Permission to do this.`);
    }
},
};