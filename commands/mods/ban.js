const { MessageEmbed } = require(`discord.js`)

module.exports = {
	name: "ban",
	category: "moderation",
	description: "Ban a member off the guild",
	usage: "<Integer>",
	aliases: [`banish`],
	run: async (client, message, args) => {
		if(!message.member.hasPermission(`MANAGE_MESSAGES`)){
			message.channel.send(`You don't have Permission to do this.`)
			.then(m => m.delete({ timeout: 5000}))
			return;
		}
	message.delete();
    if(args[0]){
        if(args[0] === message.mentions.members.id){
            var mem = args[0]
            if(agrs[1]){
                var reason = args.slice(1)
                message.channel.semd(`${mem} has been Banished from ${guild.name} \n Reason: ${reason}`)
            }
        }
    }else if(args[0] === client.user.id){

        message.channel.send(``)
    }
}
};