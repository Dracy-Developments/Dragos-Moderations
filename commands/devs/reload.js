const fs = require("fs");
const { MessageEmbed } = require("discord.js");
const { trusted } = require(`./../../config.json`)


module.exports = {
  name: "reload",
  aliases: [``],
  run: async (client, message, args) => {
    if(trusted.includes(message.author.id)){
		
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
  }else{
    essage.channel.send(`❌ You don't have Permission to do this.`)
  }
}
}