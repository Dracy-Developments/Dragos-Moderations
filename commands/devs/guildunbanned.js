const { trusted } = require(`./../../config.json`);
const ConfigManager = require(`../../util/guildBanning`);
module.exports = {
    name: "guildunban",
    aliases: [`gunban`],
    run: async (client, message, args) => {
        if(trusted.includes(message.author.id)) {
            if(client.guilds.cache.get(args[0])) {
                ConfigManager.pardonGuild(args[0]);
                return message.channel.send(`📊 Unbanned ${message.guild.name}`);
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