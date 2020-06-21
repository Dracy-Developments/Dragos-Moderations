const { MessageEmbed } = require(`discord.js`);

module.exports = {
	name: "warn",
	aliases: [``],
	run: async (client, message, args) => {
		if(!message.member.hasPermission(`MANAGE_MESSAGES`)) {
			message.channel.send(`You don't have Permission to do this.`)
			.then(m => m.delete({ timeout: 5000 }));
			return;
		}
		if(!args[0] || !args[1]) {
			if(!args[0]) {
				const embed = new MessageEmbed()
				.setTitle(`❌ Error`)
				.setDescription(`Please Provide a **Violator** \n\n Command Usage: >warn **<UserID/Mention>** <Reason>`);
				return message.channel.send(embed);
			}
			else if(!args[1]) {
				return message.channel.send(`❌ Error: Please Provide a **Reason** \n\n Command Usage: >warn <UserID/Mention> **<Reason>**`);
			}
		}
		else{
			const violator = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
			if(!violator) {
				return message.channel.send(`❌ Error: I couldn't find the Violator, did you @ the User? Did you Include User ID`);
			}
			else if(violator.id === message.author.id) {
				return message.channel.send(`❌ Error: You Can't just warn yourself it that's Self Harm and I DON'T SUPPORT THAT QWQ!`);
			}
			else if(violator.hasPermission(`ADMINISTRATOR`) && !violator.hasPermission(`ADMINISTRATOR`) || violator.hasPermission(`MANAGE_MESSAGES`) && !message.member.hasPermission(`ADMINISTRATOR`)) {
				return message.channel.send(`❌ Error: You cannot warn other Staff Members, Unless you're admin.`);
			}
			else if(!message.guild.me.hasPermission(`BAN_MEMBERS`)) {
				return message.channel.send(`❌ Error: I **cannot Warn Members** qwq \n\n Please make sure you have this enabled \n\n https://cdn.discordapp.com/attachments/599274025629515776/716723293138321408/unknown.png`);
			}
			else{
				message.delete();
				message.channel.send(`🔨 Warned ${violator.user.username} for ${args.slice(1)}`);
				violator.user.send(`⚠️ You have been warned in ${message.guild.name}\n **Reason:** ${args.slice(1)}`);
			}
		}
	},
};