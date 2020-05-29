const { MessageEmbed } = require(`discord.js`)
module.exports = {
    name: "say",
    category: "moderation",
    description: "Makee the bot say something",
    usage: "<String>",
    run: async (client, message, args) => {
	if(args[0]){
        message.delete()
        message.channel.send(args.slice(0).join(" "))
    }
    else{
        message.delete()
        message.channel.send(`Say Something At least SMH`).then( msg => msg.delete({timeout: 5000}))
    }

}
}