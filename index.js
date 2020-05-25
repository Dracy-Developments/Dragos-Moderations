const { Client, Collection } = require (`discord.js`);
const { token, prefix } = require(`./config.json`);
const fs = require(`fs`);
const client = new Client();

client.commands = new Collection();

const commandFiles = fs.readdirSync(`./commands/`).filter(file => file.endsWith(`.js`))

for (const file of commandFiles){
  const cmd = require(`./commands/${file}`)
  console.log(`✅ ${file}`)
  client.on(cmd.name, cmd.run)
}

const eventFiles = fs.readdirSync(`./events/`).filter(file => file.endsWith(`.js`))

for (const file of eventFiles){
  const event = require(`./events/${file}`)
  console.log(`✅ ${file}`)
  client.on(event.name, event.run)
}

client.on("ready", () => {
    console.log(`Drago's Moderation is Currently Running on Drago's Moderation Rewritten with ${client.users.cache.size} Users and ${client.guilds.cache.size} Guilds`);

    client.user.setPresence({
        status: "online",
        game: {
            name: ",bdkbkjbkjdfbkdkjdfbkd",
            type: "STREAMING"
        }
    }); 
});

client.on("message", async message => {
    if (!message.guild) return;
    if (!message.content.startsWith(prefix)) return;
    if (!message.member) message.member = await message.guild.fetchMember(message);

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    
});


client.login(token)