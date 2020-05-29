const { MessageEmbed } = require(`discord.js`)

module.exports = {
	name: "nuke",
	category: "moderation",
	description: "deletes and remake the channel",
	usage: " ",
	run: async (client, message, args) => {
	const post = message.channel.position
	message.channel.clone()
	.then( newchan => {
		newchan.setPosition(post)
		message.channel.delete()
	})
}
}