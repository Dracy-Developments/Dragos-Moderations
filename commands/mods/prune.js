const { MessageEmbed } = require(`discord.js`)

module.exports = {
	name: "prune",
	aliases: [`purge`],
	run: async (client, message, args) => {
		if(!message.member.hasPermission(`MANAGE_MESSAGES`)){
			message.channel.send(`You don't have Permission to do this.`)
			.then(m => m.delete({ timeout: 5000}))
			return;
		}
	message.delete();
	message.channel.bulkDelete(args[0])
	if(args[1]){
		message.channel.send(`✅ Deleted ${args[0]} Messages. \n Reason: ${args.slice(1)}`)
		.then(msg => msg.delete({ timeout: 5000 }))
	}
	else{
		message.channel.send(`✅ Deleted ${args[0]} Messages.`)
		.then(msg => msg.delete({ timeout: 5000 }))
	}
}
}