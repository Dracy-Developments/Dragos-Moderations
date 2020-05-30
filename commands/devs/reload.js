const fs = require("fs");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "reload",
  category: "dev",
  description: "reloads the bot",
  usage: " ",
  aliases: [``],
  run: async (client, message, args) => {
    if(message.author.id !== `563854476021334047` || `163164447848923136`){
			message.channel.send(`You don't have Permission to do this.`)
      .then(m => m.delete({ timeout: 5000}))
      return;
		}
    var embed = new MessageEmbed()
      .setTitle("Reloading...")
      .setColor("BLUE")
      .setImage(`https://cdn.discordapp.com/attachments/599274025629515776/715740334612676638/tenor.gif`)

    const m = await message.channel.send(embed);
    fs.readdirSync("./commands/").forEach(dir => {
      const commands = fs
        .readdirSync(`./commands/${dir}`)
        .filter(f => f.endsWith(".js"));

      for (let file of commands) {
        let pull = require(`../${dir}/${file}`);
        if (pull.name) {
          delete require.cache[require.resolve(`../${dir}/${file}`)];
          client.commands.delete(pull);
          client.commands.set(pull.name, pull);
        }
      }
    });
    embed.setTitle(`Finished Reloading!`)
    m.edit(embed)
}
}