/* eslint-disable no-unused-vars */
const {
    Client,
    Collection,
    MessageEmbed,
} = require("discord.js");

const {
    token,
    prefix,
    devtoken,
    devprefix,
    logChannel,
    errorChannel,
    dmChannel,
} = require("./config.json");
const readline = require(`readline`);
const client = new Client();
const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/dmod', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then();
const statcord = require(`statcord.js`);
const statclient = new statcord("statcord.com-LpAPdiMptTTRpzmp7fjI", client);
// Your shit is my Lost :3
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});


client.commands = new Collection();
client.aliases = new Collection();


["command"].forEach(handler => require(`./handlers/${handler}`)(client));

// On the Ready Event It'll log on the console that the bot is running and set it's presence
client.on("ready", async () => {
    await statclient.autoPost();
    console.log(`Drago's Moderation is ready for ${client.guilds.cache.size} Guilds`);
    const readyEmbed = new MessageEmbed()
        .setTitle(`[LOG] The Drago's Moderation is Running`)
        .addField(`Bot:`, `${client.user.username}`)
        .addField(`Started On:`, `${client.readyAt}`)
        .addField(`Guild Count:`, `${client.guilds.cache.size}`)
        .addField(`Guilds`, `\`\`\`${client.guilds.cache.map(m => m.name).join(`\n`)}\`\`\``)
        .setFooter(`Credits TO LostNuke`)
        .setColor(0x36393e)
        .setThumbnail(`https://cdn.discordapp.com/emojis/715650351339929660.gif?v=1`);
    client.channels.cache.get(logChannel).send(readyEmbed);
    client.user.setPresence({
        activity: {
            name: "My Development.",
            type: `WATCHING`,
        },
        status: 'dnd',
    });


    // On the Message Event it'll Ignore Bots, Send a Message to a Channel when a user DMs the Bot
    client.on("message", async message => {
        if (message.author.bot) return;
        if (message.mentions.users.get(`680948196218109982`)) return message.channel.send(`My Default Prefix is \`J>\``);
        if (message.channel.type === `dm`) {
            try {
                const dmembed = new MessageEmbed()
                    .setTitle(`NEW DM FROM ${message.author.username} OWO`)
                    .setThumbnail(`https://cdn.discordapp.com/attachments/599274025629515776/719658358512156732/image5042148547300291304.jpg`)
                    .setColor(`0x36393e`)
                    .setAuthor(`${message.author.username}`, `${message.author.displayAvatarURL()}`)
                    .addField(`Message`, `${message.content}`);
                client.channels.cache.get(dmChannel).send(dmembed);
            }
            catch (err) {
                client.channels.cache.get(dmChannel).send(`${message.author.username} said ${message.content} with an error! \n\n ${err}`);
            }
        }
        // if it's in a DM (so not in a guild), just skip
        if (!message.guild) return;
        // if the message doesn't start with the prefix, forget about it
        if (!message.content.startsWith(prefix)) return;
        // this will check if the member is an guild member
        if (!message.member) message.member = await message.guild.fetchMember(message);
        // Split the line to two variables: cmd and args
        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const cmd = args.shift().toLowerCase();

        if (cmd.length === 0) return;
        let command = client.commands.get(cmd);
        // statclient.postCommand(cmd, message.author.id);
        if (!command) command = client.commands.get(client.aliases.get(cmd));
        if (command) command.run(client, message, args);
    });
});

// Dev Token = Test Bot
// Token = Official Bot
// Beta Token = Beta Bot ( No token is Assigned YET )

client.login(token);