const { MessageEmbed } = require(`discord.js`)

exports.run = async (client, message, args) => {
	const post = message.channel.position
	message.channel.clone()
	.then( newchan => {
		newchan.setPosition(post)
		message.channel.delete()
	})
}