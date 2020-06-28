/* eslint-disable no-unused-vars */
const { MessageEmbed } = require(`discord.js`);
const Mongoose = require(`mongoose`);

module.exports = {
	name: "unban",
	aliases: [],
	run: async (client, message, args) => {
        try{

		// Check if the Member Can Ban Members
		if(!message.member.hasPermission(`BAN_MEMBERS`)) {
			message.channel.send(`You don't have Permission to do this.`)
			.then(m => m.delete({ timeout: 5000 }));
			return;
		}
		// Check if the command has the Member wanting to ban and Reason
		if(!args[0] || !args[1]) {
			if(!args[0]) {
				const embed = new MessageEmbed()
				.setTitle(`❌ Error`)
				.setDescription(`Please Provide a **Violator** \n\n Command Usage: >unban **<UserID>** <Reason>`);
				return message.channel.send(embed);
			}
else if(!args[1]) {
				return message.channel.send(`❌ Error: Please Provide a **Reason** \n\n Command Usage: >ban <UserID> **<Reason>**`);
			}
else{
			// Gets the violator
			const duser = client.users.cache.get(args[0]);
            message.delete();
        message.guild.memebrs.unban(duser, { reason: `${args.slice(1).join(` `)}` });
        return message.channel.send(`🔨 Unbanned ${duser.username} for ${args.slice(1)}`);
        }
			}
        }catch(err){
            console.log(err)
        }
    }
    };