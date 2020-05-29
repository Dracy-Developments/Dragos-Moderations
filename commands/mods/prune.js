const { MessageEmbed } = require(`discord.js`)

module.exports = {
	name: "prune",
	category: "moderation",
	description: "delete messages",
	usage: "<Integer>",
	run: async (client, message, args) => {
	message.delete();
	message.channel.bulkDelete(args[0])

}
}