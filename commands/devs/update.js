const exec = require('child_process').exec;
const { MessageEmbed } = require(`discord.js`)

module.exports = {
    name: "update",
    category: "dev",
    description: "updates the bot",
    usage: " ",
    aliases: [``],
    run: async (client, message, args) => {
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

}
}