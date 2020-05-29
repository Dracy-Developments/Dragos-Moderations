const { MessageEmbed } = require(`discord.js`)
module.exports = {
    name: "say",
    category: "devs",
    description: "Makee the bot say something",
    usage: "<String>",
    aliases: [``],
    run: async (client, message, args) => {
        if(message.author.id !== `563854476021334047`) return message.channel.send(`No Perms My Dude`)
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