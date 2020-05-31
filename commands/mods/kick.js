const { MessageEmbed } = require(`discord.js`)
const Mongoose = require(`mongoose`)

module.exports = {
	name: "ban",
	aliases: [`banish`],
	run: async (client, message, args) => {
		if(!message.member.hasPermission(`KICK_MEMBERS`)){
			message.channel.send(`You don't have Permission to do this.`)
			.then(m => m.delete({ timeout: 5000}))
			return;
		}

	
	}
};