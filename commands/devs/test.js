const {MessageEmbed} = require(`discord.js`)
const { trusted } = require(`./../../config.json`)

module.exports = {
    name: "test",
    aliases: [``],
    run: async (client, message, args) => {
        if(trusted.includes(message.author.id)){

        }   else{
            message.channel.send(`:x: You don't have Permission to do that`)
        }
    
    }
}
