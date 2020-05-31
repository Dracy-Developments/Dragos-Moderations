const { MessageEmbed } = require(`discord.js`)

module.exports = {
	name: "mute",
	aliases: [``],
	run: async (client, message, args) => {
		if(!message.member.hasPermission(`MANAGE_ROLES`)){
			message.channel.send(`You don't have Permission to do this.`)
			.then(m => m.delete({ timeout: 5000}))
			return;
		}

	
	}
};