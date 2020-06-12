const { MessageEmbed } = require("discord.js");
const { trusted } = require(`./../../config.json`)


module.exports = {
  name: "kill",
  aliases: [``],
  run: async (client, message, args) => {
    if(trusted.includes(message.author.id)){
       
      await message.delete();
      await message.send(`The Bot has Commit Death`)
      await client.destroy();
    }else{
      message.channel.send(`❌ You don't have Permission to do this.`)
    }
}
}