const { MessageEmbed } = require(`discord.js`)
const Mongoose = require(`mongoose`)

module.exports = {
	name: "kick",
	aliases: [],
	run: async (client, message, args) => {
		if(!message.member.hasPermission(`KICK_MEMBERS`)){
			message.channel.send(`You don't have Permission to do this.`)
			.then(m => m.delete({ timeout: 5000}))
			return;
		}
		
			if(!args[0] || !args[1]){
			if(!args[0]){
				const embed = new MessageEmbed()
				.setTitle(`❌ Error`)
				.setDescription(`Please Provide a **Violator** \n\n Command Usage: >kick **<UserID/Mention>** <Reason>`)
				return message.channel.send(embed)
			}
			else if(!args[1]){
				return message.channel.send(`❌ Error: Please Provide a **Reason** \n\n Command Usage: >kick <UserID/Mention> **<Reason>**`)
			}
		}
		else{
			const violator = message.mentions.members.first() || message.guild.members.cache.get(args[0])
			if(!violator){
				return message.channel.send(`❌ Error: I couldn't find the Violator, did you @ the User? Did you Include User ID`)
			}
			else if(violator.id === message.author.id){
				return message.channel.send(`❌ Error: You Can't just kick your self it that's Self Harm and I DON'T SUPPORT THAT QWQ!`)
			}
			else if(violator.hasPermission(`ADMINISTRATOR`) && !violator.hasPermission(`ADMINISTRATOR`)|| violator.hasPermission(`MANAGE_MESSAGES`) && !message.member.hasPermission(`ADMINISTRATOR`)){
				return message.channel.send(`❌ Error: You cannot warn other Staff Members, Unless you're admin.`)
			}

			else if(!message.guild.me.hasPermission(`KICK_MEMBERS`)){
				return message.channel.send(`❌ Error: I **cannot kick Members** qwq \n\n Please make sure you have this enabled \n\n https://cdn.discordapp.com/attachments/599274025629515776/716723293138321408/unknown.png`)
			}
			else if(!violator.kickable){
				violator.kick().catch(err => message.channel.send(`❌ Error: This user cannot be Kicked... QWQ \n Reason: \`${err}\`\n\n Possibilities to Fixing it:\n If the Bot's error is \`\`\`DiscordAPIError: Missing Permissions\`\`\`**Solution:** Make sure the Bot's Role or Bot Role ( If Applicable ) is On top of the person's highest role ie If I'm wanting to kick a Member the bot's role should be **__above__** the members role https://cdn.discordapp.com/attachments/599274025629515776/716809251141582998/unknown.png  `))
				message.channel.send
			}
			else{
				message.delete()
				violator.kick({ reason: `${args.slice(1).join(` `)}`})
				return message.channel.send(`🔨 Kicked  ${violator.user.username} for ${args.slice(1)}`)
			}
		}
	}
};