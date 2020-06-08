const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "help",
  aliases: [``],
  run: async (client, message, args) => {
    if(message.author.id === `563854476021334047` || message.author.id ===`163164447848923136`){
    
    const embed = new MessageEmbed()
    .setTitle(`Help`)
    .addField(`\u200b`, `COMMANDS`)
    .addField(`COMING`, `SOON`)
}else{
  message.channel.send(`❌ You don't have Permission to do this.`)
}
}
}