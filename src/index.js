const { Client } = require (`discord.js`);
const client = new Client();
const { token } = require(`../config.json`);

client.on("ready", () => {
    console.log(`The Bot is Ready!`)
})

client.login(token)