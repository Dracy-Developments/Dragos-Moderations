const { trusted } = require(`./../../config.json`);
const fs = require(`fs`);
const chalk = require(`chalk`)

module.exports = {
    name: "reset",
    aliases: [],
    run: async (client, message) => {
        if(trusted.includes(message.author.id)) {
            client.guilds.cache.forEach(g => {

                    fs.writeFileSync(`./data/guild/${g.id}.json`, fs.readFileSync(`./data/guild/template.json`));
                    console.log(chalk.blueBright(`[LOG]`),(`Create Configuration Files for ${g.name}`));
                    message.reply(`Resetted the Database`)
                });

        }else{
        message.channel.send(`❌ You don't have Permission to do this.`);
    }
},
};