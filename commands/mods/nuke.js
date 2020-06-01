
module.exports = {
	name: "nuke",
	category: "moderation",
	description: "deletes and remake the channel",
	usage: " ",
	aliases: [``],
	run: async (client, message, args) => {
		if(!message.member.hasPermission(`MANAGE_CHANNELS`) || !message.author.id(`563854476021334047`)){
			message.channel.send(`You don't have Permission to do this.`)
			.then(m => m.delete({ timeout: 5000}))
			return;
		}
	const post = message.channel.position
	message.channel.clone()
	.then( newchan => {
		newchan.setPosition(post)
		message.channel.delete()
	})
}
}