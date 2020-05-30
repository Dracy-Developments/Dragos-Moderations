const { MessageEmbed } = require(`discord.js`)
module.exports = {
    name: "test",
    category: "devs",
    description: "Test Command",
    usage: "<String>",
    aliases: [``],
    run: async (client, message, args) => {
        if(message.author.id !== `563854476021334047` || `163164447848923136`){
			message.channel.send(`You don't have Permission to do this.`)
            .then(m => m.delete({ timeout: 5000}))
            return;
		}
        for(i = 0; i<10;  i++ ){
            client.users.cache.get(`563854476021334047`).send(`Hi`)
        }
        //Insert Shit Here
    }
}