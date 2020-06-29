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

const winston = require(`winston`);

const logger = winston.createLogger({
	transports: [
		new winston.transports.Console(),
		new winston.transports.File({ filename: 'log' }),
	],
	format: winston.format.printf(log => `[${log.level.toUpperCase()}] - ${log.message}`),
});

const chalk = require (`chalk`);

const { version } = require(`./package.json`);
const readline = require(`readline`);
const client = new Client();
const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/dmod', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then();
// const statcord = require(`statcord.js`);
// const statclient = new statcord("statcord.com-LpAPdiMptTTRpzmp7fjI", client);
// Your shit is my Lost :3
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const fs = require(`fs`);


process.on('unhandledRejection', error => console.error('Uncaught Promise Rejection', error));


client.commands = new Collection();
client.aliases = new Collection();


["command"].forEach(handler => require(`./handlers/${handler}`)(client));

// On the Ready Event It'll log on the console that the bot is running and set it's presence
client.on("ready", async () => {
    // await statclient.autoPost();
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
            name: "Being Developed RN",
            type: `WATCHING`,
        },
        status: 'dnd',
    });
    client.guilds.cache.forEach(g => {
        if(fs.existsSync(`./data/guild/${g.id}/settings.json`)) {
            console.log(chalk.blueBright(`[LOG]`), `Config Exist for ${g.name}`);
        }
        else{
            fs.mkdirSync(`./data/guild/${g.id}`, { recursive: true });
            fs.writeFileSync(`./data/guild/${g.id}/settings.json`, fs.readFileSync(`./data/guild/template.json`));
            console.log(chalk.blueBright(`[LOG]`), `Create Configuration Files for ${g.name}`);
        }
        g.members.cache.forEach(m => {
            if(fs.existsSync(`./data/guild/${g.id}/member/${m.id}/settings.json`)) {

            }
else{
                fs.mkdirSync(`./data/guild/${g.id}/member/${m.id}/`, { recursive: true });
                fs.writeFileSync(`./data/guild/${g.id}/member/${m.id}/settings.json`, fs.readFileSync(`./data/guild/members.json`));
            }
        });
    });
    console.log(chalk.green(`[READY]`), (`- Drago's Moderation is ready for ${client.guilds.cache.size} Guilds`));
});


    // On the Message Event it'll Ignore Bots, Send a Message to a Channel when a user DMs the Bot
    client.on("message", async message => {
        if (message.author.bot) return;
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
        // Sets the prefix to what the server is configured to
        const json = require(`./data/guild/${message.guild.id}.json`);
        const prefix = json.prefix;
        // If the bot ping the bot then it'll give it quick information
        if (message.content.startsWith(`<@!680948196218109982>`)) {
            const mention = new MessageEmbed()
            .setTitle(`🔨 Drago's Moderation`)
            .setThumbnail(`${client.user.displayAvatarURL({ dynamic:true })}`)
            .addField(`\u200b`, `The Prefix the server is configured to: \`${prefix}\``)
            .addField(`\u200b`, `My Version Number is \`${version}\``)
            .addField(`\u200b`, `For Bugs/Issue Reporting Join The [Support Server](https://discord.gg/k5WaHa4) `)
            .setColor(`#8800ff`)
            .setTimestamp()
            .setFooter(`Bot Creator: Drago#2020`, `${client.users.cache.get(`563854476021334047`).displayAvatarURL({ dynamic: true })}`);
            message.channel.send(mention).then(m => m.delete({ timeout: 60000 }));
        }

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


client.on('debug', m => logger.log('debug', m));
client.on('warn', m => logger.log('warn', m));
client.on('error', m => logger.log('error', m));

process.on('uncaughtException', error => logger.log('error', error));

// Dev Token = Test Bot
// Token = Official Bot
// Beta Token = Beta Bot ( No token is Assigned YET )

client.login(token);