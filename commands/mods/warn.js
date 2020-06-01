const { MessageEmbed } = require(`discord.js`)

module.exports = {
	name: "warn",
	aliases: [``],
	run: async (client, message, args) => {
		if(!message.member.hasPermission(`KICK_MEMBERS`)){
			message.channel.send(`You don't have Permission to do this.`)
			.then(m => m.delete({ timeout: 5000}))
			return;
		}
	
	}
};