/* eslint-disable no-unused-vars */
const { MessageEmbed } = require(`discord.js`);
const MemberManager = require(`../../util/memberManager`);
module.exports = {
    name: "unmute",
    aliases: [],
    run: async (client, message, args) => {
        try{

            // Check if the Member Can Ban Members
            if(!message.member.hasPermission(`MANAGE_ROLES`)) {
                message.channel.send(`You don't have Permission to do this.`)
                    .then(m => m.delete({ timeout: 5000 }));
                return;
            }
            // Check if the command has the Member wanting to ban and Reason
            else if(!args[0] || !args[1]) {
                if(!args[0]) {
                    const embed = new MessageEmbed()
                        .setTitle(`❌ Error`)
                        .setDescription(`Please Provide a **Violator** \n\n Command Usage: >unmute **<UserID>** <Reason>`);
                    return message.channel.send(embed);
                }
                else if(!args[1]) {
                    const embed = new MessageEmbed()
                        .setTitle(`❌ Error`)
                        .setDescription(`Please Provide a **Reason** \n\n Command Usage: >unmute <UserID> **<Reason>**`);
                    return message.channel.send(embed);
                }
            }
            else{
                // Gets the violator
                const violator = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
                message.delete();
                MemberManager.pardonMute(violator.user.id, message.guild.id);
                return message.channel.send(`🔨 Unmuted ${violator.user.username} for ${args.slice(1).join(" ")}`);
            }
        }

        catch(err) {
            console.log(err);
        }
    },
};