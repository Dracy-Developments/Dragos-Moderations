const { readdirSync } = require("fs");
const chalk = require(`chalk`);
module.exports = (client) => {
    readdirSync("./commands/").forEach(dir => {
        const commands = readdirSync(`./commands/${dir}/`).filter(file => file.endsWith(".js"));

        for (const file of commands) {
            const pull = require(`../commands/${dir}/${file}`);

            if (pull.name) {
                client.commands.set(pull.name, pull);
                console.log(chalk.greenBright(`[LOG]`), (`${pull.name.toUpperCase()} has Loaded`));
            }
            else {
                console.log(chalk.redBright(`[ERROR]`), (`${pull.name} had Issues Loading ;/`));
                continue;
            }

            if (pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => client.aliases.set(alias, pull.name));
        }
    });
};