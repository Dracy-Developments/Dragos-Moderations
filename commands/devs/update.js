const exec = require('child_process').exec;
const { MessageEmbed } = require(`discord.js`)

module.exports = {
    name: "update",
    aliases: [``],
    run: async (client, message, args) => {
        if(!message.author.id === `563854476021334047` || !message.author.id ===`163164447848923136`){
            
            var execProcess = require("../../exec_process");
            execProcess.result("sh update.sh", async function(err, response){
                if(!err){
            
            await console.log(response);
            
            const embed = new MessageEmbed()
            .setColor(`BLUE`)
            .setDescription(`Updating... \n\n This may take a bit...`)
            const complete = new MessageEmbed()
            .setColor(`BLUE`)
            .setDescription(`You May Now do \`>reload\`to Reload the bot with the New Features \n \`\`\`${response}\`\`\``)
            message.channel.send(embed)
            .then(msg => msg.edit(complete))
        }else {
            console.log(err);
        }
    });
    }else{
    message.channel.send(`❌ You don't have Permission to do this.`)
    }    

}
}