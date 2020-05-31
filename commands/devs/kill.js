const fs = require("fs");
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
    await message.delete();
    await message.send(`The Bot has Commit Death`)
    await process.exit()
}
}