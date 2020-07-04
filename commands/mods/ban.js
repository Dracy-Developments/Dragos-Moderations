/* eslint-disable no-unused-vars */
const {
    MessageEmbed,
} = require(`discord.js`);
const Mongoose = require(`mongoose`);
const Logging = require(`./../../util/loggings.js`);

module.exports = {
    name: "ban",
    aliases: [`banish`],
    run: async (client, message, args) => {

        // Check if the Member Can Ban Members
        if (!message.member.hasPermission(`BAN_MEMBERS`)) {
            message.channel.send(`You don't have Permission to do this.`)
                .then(m => m.delete({
                    timeout: 5000,
                }));
            return;
        }
        // Check if the command has the Member wanting to ban and Reason
        if (!args[0] || !args[1]) {
            if (!args[0]) {
                const embed = new MessageEmbed()
                    .setTitle(`❌ Error`)
                    .setDescription(`Please Provide a **Violator** \n\n Command Usage: >ban **<UserID/Mention>** <Reason>`);
                return message.channel.send(embed);
            }
            else if (!args[1]) {
                return message.channel.send(`❌ Error: Please Provide a **Reason** \n\n Command Usage: >ban <UserID/Mention> **<Reason>**`);
            }
        }
        else {
            // Gets the violator
            const violator = message.guild.members.cache.get(args[0]) || message.mentions.members.first();
            const user = client.users.fetch(args[0]);
            const reason = args.slice(1).join(" ");
            const reporter = message.member;
            const guild = message.guild;
            console.log(user);

            if (violator) {
                if (violator.id === message.author.id) {
                    return message.channel.send(`❌ Error: You Can't just ban yourself!`);
                }
                else if (violator.hasPermission(`ADMINISTRATOR`) && !violator.hasPermission(`ADMINISTRATOR`) || violator.hasPermission(`MANAGE_MESSAGES`) && !message.member.hasPermission(`ADMINISTRATOR`)) {
                    return message.channel.send(`❌ Error: You cannot warn other Staff Members, Unless you're admin.`);
                }
                else if (!message.guild.me.hasPermission(`BAN_MEMBERS`)) {
                    return message.channel.send(`❌ Error: I **cannot Ban Members**  \n\n Please make sure you have this enabled \n\n https://cdn.discordapp.com/attachments/599274025629515776/716723293138321408/unknown.png`);
                }
                else if (!violator.bannable) {
                    message.channel.send(`❌ Error: This user cannot be Banned... Please make sure the bot's role is above that user's highest role if your wanting to ban that person`);
                }
                else {
                    message.delete();
                    Logging.banLog(client, violator, guild, reason, reporter);
                    return message.channel.send(`🔨 Banned ${violator.user.username} for ${reason}`);
                }
            }
            else if (user) {
                if (user.id === message.author.id) {
                    return message.channel.send(`❌ Error: You Can't just ban yourself!`);
                }
                client.users.fetch(args[0]).then(vio => {

                    message.guild.members.ban(vio, { reason: `${reason}` });
                    Logging.banLog(client, user, guild, reason, reporter);
                    return message.channel.send(`🔨 Banned ${vio.username} for ${reason}`);
                });
            }
            else{
                return message.channel.send(`❌ Error: Can't ban that member`);
            }
        }


    },
};