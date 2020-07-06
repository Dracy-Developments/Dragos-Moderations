/* eslint-disable no-unused-vars */
const { MessageEmbed } = require(`discord.js`);
const Logging = require(`./../../util/loggings.js`);

module.exports = {
    name: "ban",
    aliases: [`banish`],
    run: async (client, message, args) => {

        // Check if the Member Can Ban Members
        if (!message.member.hasPermission(`BAN_MEMBERS`)) return message.channel.send(`You don't have Permission to do this.`).then(m => m.delete({ timeout: 5000 }));
        // Check if the command has the Member wanting to ban and Reason
        if (!args[0]) {return Logging.errorLog(message, "ban", "Please Provide a **Violator** \n\n Command Usage: >ban **<UserID/Mention>** <Reason>");}
        else if (!args[1]) {return Logging.errorLog(message, "ban", "Please Provide a **Reason** \n\n Command Usage: >ban <UserID/Mention> **<Reason>**");}
        else {
            // Gets the violator
            const violator = message.guild.members.cache.get(args[0]) || message.mentions.members.first();
            if(!violator) {
                // eslint-disable-next-line no-var
                var user = client.users.fetch(args[0]);
                if(!user) return Logging.errorLog(message, "ban", "Cannot Find that member");
            }
            const reason = args.slice(1).join(" ");
            const reporter = message.member;
            const guild = message.guild;

            if (violator) {
                if (violator.id === message.author.id) {return Logging.errorLog(message, "ban", "You are not allowed to ban yourself.");}
                else if (violator.hasPermission(`ADMINISTRATOR`) && !violator.hasPermission(`ADMINISTRATOR`) || violator.hasPermission(`MANAGE_MESSAGES`) && !message.member.hasPermission(`ADMINISTRATOR`)) {return Logging.errorLog(message, "ban", "You cannot warn other Staff Members, Unless you adminstrative permissions.");}
                else if (!message.guild.me.hasPermission(`BAN_MEMBERS`)) {return message.channel.send(`I **cannot Ban Members**  \n\n Please make sure you given me permissions to ban`);}
                else if (!violator.bannable) {Logging.errorLog(message, "Ban", `This user cannot be Banned... Please make sure the bot's role is above that user's highest role if your wanting to ban that person`);}
                else {
                    message.delete();
                    Logging.banLog(client, violator, guild, reason, reporter);
                    const banned = new MessageEmbed()
                        .setTitle(`🔨 Banned ${violator.username}`)
                        .setDescription(`${violator.username} is banned!\nReason: \`${reason}\``)
                        .setThumbnail(`${violator.displayAvatarURL({ dynamic:true })}`)
                        .setColor(`#ee110f`);
                    return message.channel.send(banned);
                }
            }
            else if (user) {
                if (user.id === message.author.id) return Logging.errorLog(message, "Ban", "You Can't just ban yourself!");
                else if (message.guild.fetchBans(user.id)) return Logging.errorLog(message, "Ban", "This user is already banned from the server!");
                client.users.fetch(args[0]).then(vio => {

                    message.guild.members.ban(vio, { reason: `${reason}` });
                    Logging.banLog(client, user, guild, reason, reporter);
                    const banned = new MessageEmbed()
                        .setTitle(`🔨 Banned ${vio.username}`)
                        .setDescription(`${vio.username} is banned!\nReason: \`${reason}\``)
                        .setThumbnail(`${vio.displayAvatarURL({ dynamic:true })}`)
                        .setColor(`#ee110f`)
                        .setTimestamp();
                    return message.channel.send(banned);
                });
            }
            else{
                Logging.errorLog(message, "Ban", `Can't ban that member`);
            }
        }


    },
};