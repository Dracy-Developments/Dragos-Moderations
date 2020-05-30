const { Client, Collection } = require("discord.js");
const { token, prefix, devtoken } = require("./config.json");
const client = new Client();

client.commands = new Collection();
client.aliases = new Collection();


["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

client.on("ready", () => {
    console.log(`Drago's Moderation is ready for ${client.guilds.cache.size} Guilds`);

    client.user.setPresence({
        status: "online",
        game: {
            name: "The Drago's Den",
            type: "WATCHING"
        }
    }); 
})

client.on("message", async message => {
    if (message.author.bot) return;
    if  (message.channel.type ===`dm`){
        client.channels.cache.get(`715953666628124683`).send(`${message.author.username} Said \`${message}\` in my DMS`)
    }
    if (!message.guild) return;
    if (!message.content.startsWith(prefix)) return;
    if (!message.member) message.member = await message.guild.fetchMember(message);

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    
    if (cmd.length === 0) return;
    
    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));

    if (command) 
        command.run(client, message, args);
});

client.login(devtoken);