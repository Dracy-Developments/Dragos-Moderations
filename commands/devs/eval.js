const {
  MessageEmbed
} = require(`discord.js`)
const beautify = require("beautify");

module.exports = {
  name: "eval",
  aliases: [``],
  run: async (client, message, args) => {
    if (!message.author.id === `563854476021334047` ) {
      message.channel.send(`You don't have Permission to do this.`)
        .then(m => m.delete({
          timeout: 5000
        }))
      return;
    }

    if (!args[0]) {
      return message.channel
        .send("❌ This Bitch is Empty YEET!")
        .then(m => m.delete({
          timeout: 5000
        }));
    }


    if (
      args
      .join(" ")
      .toLowerCase()
      .includes("token")
    )
      return;

    const toEval = args.join(" ")
    const evaluated = eval(toEval)
    try {
      let embed = new MessageEmbed()
        .setColor(0x36393e)
        .setTimestamp()
        .setTitle('Eval')
        .addField(" 🔽 Input: ", `\`\`\`js\n ${beautify(toEval, { format: "js" })} \`\`\``)
        .addField("🔼 Output", evaluated)
        .addField("Type of: ", typeof (evaluated))
        .setThumbnail(client.user.displayAvatarURL())
      message.channel.send(embed)
    } catch (e) {
      const Post = new MessageEmbed()
        .setColor(0x36393e)
        .setTitle("ERROR")
        .setTimestamp()
        .setDescription(e)
      message.channel.send(Post)
    }
  }
}