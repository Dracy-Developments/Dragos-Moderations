const { MessageEmbed } = require(`discord.js`)
module.exports = {
    name: "say",
    aliases: [``],
    run: async (client, message, args) => {
        if(!message.author.id === `563854476021334047` || !message.author.id ===`163164447848923136`){
            
        if(args[0]){
            message.delete()
            message.channel.send(args.slice(0).join(" "))
        }
        else{
            message.delete()
            message.channel.send(`Say Something At least SMH`).then( msg => msg.delete({timeout: 5000}))
        }
    }else{
        message.channel.send(`❌ You don't have Permission to do this.`)
    }
}
}