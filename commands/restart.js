const { exec } = require("child_process");
const { MessageEmbed } = require(`discord.js`)

exports.run = async (client, message, args) => {
    try{
        const embed = new MessageEmbed()
        .setColor(`BLUE`)
        .setTitle(`Restarting...`)
        let msg = await message.channel.send(embed)
        exec("sh restart.sh")
        const embed2 = new MessageEmbed()
        .setTitle(`Restarted, Ready For Action!`)
        .setColor("GREEN")
        msg.delete()
        message.channel.send(embed2).then(m => m.delete({ timeout: 5000}))
        }catch(err) {
            message.channel.send(`❌ An Error has Ocurred \n \`${err}\``)
        }
    };