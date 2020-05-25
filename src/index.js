const { Client } = require (`discord.js`);
const client = new Client();
const { token, prefix } = require(`../config.json`);

client.on("ready", () => {
    console.log(`The Bot is Ready!`)
})

client.on("message", message => {
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    if(cmd === "test"){
        message.channel.send(`The Command Works`)
    }
})


client.login(token)