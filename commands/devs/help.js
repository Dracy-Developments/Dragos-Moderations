const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "reload",
  aliases: [``],
  run: async (client, message, args) => {
    if(!message.author.id === `563854476021334047` || !message.author.id ===`163164447848923136`){
        message.channel.send(`You don't have Permission to do this.`)
        .then(m => m.delete({ timeout: 5000}))
        return;
    }
    const embed = new MessageEmbed()
    .setTitle(`Help`)
    .addField(`\u200b`, `COMMANDS`)
    .addField(``)
}
}