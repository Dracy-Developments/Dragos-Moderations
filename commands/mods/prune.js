module.exports = {
	name: "prune",
	aliases: [`purge`],
	run: async (client, message, args) => {
		// Sometimes Leave one message behind sometimes not
		if(!message.member.hasPermission(`MANAGE_MESSAGES`)) {
			message.channel.send(`You don't have Permission to do this.`)
			.then(m => m.delete({ timeout: 5000 }));
			return;
		}
	message.delete();
	if(isNaN(args[0]) || parseInt(args[0]) <= 0) {
		return message.channel.send(`❌ Please specify an Integer or an Integer that's more than 0`)
		.then(m => m.delete({ timeout: 5000 }));
	}
	message.channel.bulkDelete(args[0]);
	if(args[1]) {
		message.channel.send(`✅ Deleted ${args[0]} Messages. \n Reason: ${args.slice(1)}`)
		.then(msg => msg.delete({ timeout: 5000 }));
	}
	else{
		message.channel.send(`✅ Deleted ${args[0]} Messages.`)
		.then(msg => msg.delete({ timeout: 5000 }));
	}
},
};