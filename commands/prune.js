const { MessageEmbed } = require(`discord.js`)

exports.run = async (client, message, args) => {
	message.delete();
	message.channel.bulkDelete(args[0])

}