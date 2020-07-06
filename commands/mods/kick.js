/* eslint-disable no-unused-vars */
const { MessageEmbed } = require(`discord.js`);
const Logging = require(`./../../util/loggings.js`);

module.exports = {
    name: "kick",
    aliases: [],
    run: async (client, message, args) => {
        if(!message.member.hasPermission(`KICK_MEMBERS`)) return Logging.errorLog(message, "Kick", `You don't have Permission to do this.\n\n RequiredPermission(s): \`KICK_MEMBERS\``);
        if(!args[0]) {return Logging.errorLog(member, "kick", `Please Provide a **Violator** \n\n Command Usage: >kick **<UserID/Mention>** <Reason>`);}
        else if(!args[1]) {return Logging.errorLog(message, "Kick", `Please Provide a **Reason** \n\n Command Usage: >kick <UserID/Mention> **<Reason>**`);}
        else{
            const violator = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
            
            if(!violator) return Logging.errorLog(message, "Kick", `I couldn't find the Violator, did you @ the User? Did you Include User ID`);
            else if(violator.id === message.author.id)return message.channel.send(message, "Kick", `You Can't just kick your self it that's Self Harm and I DON'T SUPPORT THAT QWQ!`);
            
            else if(violator.hasPermission(`ADMINISTRATOR`) && !violator.hasPermission(`ADMINISTRATOR`) || violator.hasPermission(`MANAGE_MESSAGES`) && !message.member.hasPermission(`ADMINISTRATOR`)) {
                return message.channel.send(message, "Kick",`You cannot warn other Staff Members, Unless you're admin.`);
            }

            else if(!message.guild.me.hasPermission(`KICK_MEMBERS`)) {
                return message.channel.send(`I **cannot kick Members** qwq \n\n Please make sure you have this enabled \n\n https://cdn.discordapp.com/attachments/599274025629515776/716723293138321408/unknown.png`);
            }
            else if(!violator.kickable) {
                violator.kick().catch(err => message.channel.send(`This user cannot be Kicked... QWQ \n Reason: \`${err}\`\n\n Possibilities to Fixing it:\n If the Bot's error is \`\`\`DiscordAPIError: Missing Permissions\`\`\`**Solution:** Make sure the Bot's Role or Bot Role ( If Applicable ) is On top of the person's highest role ie If I'm wanting to kick a Member the bot's role should be **__above__** the members role https://cdn.discordapp.com/attachments/599274025629515776/716809251141582998/unknown.png  `));
                message.channel.send;
            }
            else{
                message.delete();
                violator.kick({ reason: `${args.slice(1).join(` `)}` });
                return message.channel.send(`🔨 Kicked  ${violator.user.username} for ${args.slice(1)}`);
            }
        }
    },
};