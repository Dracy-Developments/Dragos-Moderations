const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const bot = new Discord.Client();

const fs = require("fs");
bot.commands = new Discord.Collection();

const commandsFiles = fs.readdirSync("./commands/").filter(file => file.endsWith(".js"));
for (const file of commandsFiles) {
    const command = require(`./commands/${file}`);
    bot.commands.set(command.name, command);
}

bot.on("ready", () => {
    console.log(`${bot.user.username}, is streaming!`)
    bot.user.setPresence({
        activity: {
            name: "'help",
            type: "STREAMING"
        },
        status: "streaming"
    });
});

bot.on("message", message => {

    if (message.author.bot) return;

    let args = message.content.substring(botconfig.prefix.lenth).split(" ");

    if (message.content.startsWith(botconfig.prefix)) {

        switch (args[0].toLowerCase()) {

            case `hi`:
                bot.commands.get(`hi`).execute(message, args);
                break;



        }


    } else {
        return;
    }

})



bot.login(botconfig.token);