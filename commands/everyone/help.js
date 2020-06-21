const {
  MessageEmbed,
} = require("discord.js");

module.exports = {
  name: "help",
  aliases: [``],
  run: async (client, message) => {
      if (message.author.id === `563854476021334047` || message.author.id === `163164447848923136`) {

          const embed = new MessageEmbed()
              .setTitle(`Help`)
              .addField(`\u200b`, `**COMMANDS**`)
              .addField(`\u200b`, `\u200b`)
              .addField(`COMING`, `SOON`);
          message.channel.send(embed);
      }
else {
          message.channel.send(`❌ You don't have Permission to do this.`);
      }
  },
};