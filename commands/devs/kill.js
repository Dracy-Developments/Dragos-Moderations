const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "kill",
  aliases: [``],
  run: async (client, message, args) => {
    if(message.author.id === `563854476021334047`){
       
      await message.delete();
      await message.send(`The Bot has Commit Death`)
      await client.destroy();
    }else{
      message.channel.send(`❌ You don't have Permission to do this.`)
    }
}
}