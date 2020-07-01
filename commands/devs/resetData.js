const { trusted } = require(`./../../config.json`);
const fs = require(`fs`);
const chalk = require(`chalk`);

module.exports = {
    name: "reset",
    aliases: [],
    run: async (client, message) => {
        if(trusted.includes(message.author.id)) {
            client.guilds.cache.forEach(g => {
                g.members.cache.forEach(m => {
                    fs.writeFileSync(`./data/guild/${g.id}/member/${m.id}/settings.json`, fs.readFileSync(`./data/guild/members.json`));
                });
                console.log(chalk.green(`[Success]`), (`Resetted Data for ${g.name}`));
                });

        }
else{
        message.channel.send(`❌ You don't have Permission to do this.`);
    }
},
};