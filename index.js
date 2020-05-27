const { Client, Collection } = require(`discord.js`);
const Enmap = require("enmap");
const fs = require("fs");
const { token, devtoken } = require(`./config.json`)
const client = new Client({
})

client.commands = new Collection;
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

fs.readdir('./commands/', async (err, files) => {
  if (err) return console.error;
  files.forEach(file => {
    if (!file.endsWith('.js')) return;
    let props = require(`./commands/${file}`);
    let cmdName = file.split('.')[0];
    console.log(`Loaded command '${cmdName}'`);
    client.commands.set(cmdName, props);
  });
});


fs.readdir('./events/', (err, files) => {

  if (err) return console.error;
  files.forEach(file => {
    if (!file.endsWith('.js')) return;
    const evt = require(`./events/${file}`);
    let evtName = file.split('.')[0];
    console.log(`Loaded event '${evtName}'`);
    client.on(evtName, evt.bind(null, client));
  });
});


client.login(devtoken)

