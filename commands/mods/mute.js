const MemberConfig = require(`../../util/memberManager`);
const { MessageEmbed } = require(`discord.js`);


module.exports = {
	name: "mute",
	aliases: [`shut`],
	run: async (client, message, args) => {
		if(!message.member.hasPermission(`MANAGE_ROLES`) || !message.author) {
			message.channel.send(`You don't have Permission to do this.`)
			.then(m => m.delete({ timeout: 5000 }));
			return;
		}if(!args[0] || !args[1]) {

			if(!args[0]) {
				const embed = new MessageEmbed()
				.setTitle(`❌ Error`)
				.setDescription(`Please Provide a **Violator** \n\n Command Usage: >mute **<UserID/Mention>** <Reason>`)
				.setColor(`RED`);
				return message.channel.send(embed);
			}
			else if(!args[1]) {
				const embed = new MessageEmbed()
				.setTitle(`❌ Error`)
				.setDescription(`Please Provide a **Reason** \n\n Command Usage: >mute **<UserID/Mention>** <Reason>`)
				.setColor(`RED`);
				return message.channel.send(embed);
						}
		}
else{
			const json = require(`../../data/guild/${message.guild.id}/settings.json`);
			const violator = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
			if(!violator) {
				return message.channel.send(`❌ Error: I couldn't find the Violator, did you @ the User? Did you Include User ID`);
			}
			else if(violator.id === message.author.id) {
				return message.channel.send(`❌ Error: You Can't just kick your self it that's Self Harm and I DON'T SUPPORT THAT QWQ!`);
			}
			else if(violator.hasPermission(`ADMINISTRATOR`) && !violator.hasPermission(`ADMINISTRATOR`) || violator.hasPermission(`MANAGE_MESSAGES`) && !message.member.hasPermission(`ADMINISTRATOR`)) {
				return message.channel.send(`❌ Error: You cannot warn other Staff Members, Unless you're admin.`);
			}

			else if(!message.guild.me.hasPermission(`MANAGE_ROLES`)) {
				return message.channel.send(`❌ Error: I **cannot mute Members** qwq \n\n Please make sure you have this enabled \n\n https://cdn.discordapp.com/attachments/599274025629515776/716723293138321408/unknown.png`);
			}
else if(!message.guild.roles.cache.get(`${json.muteRole}`)) {
				return message.channel.send(`❌ Error: I **cannot mute Members** if theres no mute role`);
			}
			else if(json.muted.includes(violator.id)) {
				return message.channel.send(`❌ Error: I **cannot mute Members** if they are muted already`);
			}
else{
				try{
				message.delete();
				MemberConfig.muteUser(violator.user.id, message.guild.id, args.slice(1).join(` `));
				violator.roles.add(`${json.muteRole}`);
				return message.channel.send(`🔨 Muted  ${violator.user.username} for ${args.slice(1).join(` `)}`);
				}
catch(err) {
					message.channel.send(`:x: An Error Occured: ${err}`);
				}
			}

		}
	},

};

//			const violator = message.mentions.members.first() || message.guild.members.cache.get(args[0])
// MemberConfig.muteUser(violator.user.id, message.guild.id, args.slice(1));
