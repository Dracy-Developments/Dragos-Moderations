const {
  MessageEmbed
} = require(`discord.js`)
const beautify = require("beautify");

module.exports = {
  name: "eval",
  aliases: [``],
  run: async (client, message, args) => {
    if(message.author.id === `563854476021334047`||message.author.id ===`163164447848923136` || message.author.id===(`436565164674908170`)){
     
    

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

      try {
    const toEval = args.join(" ")
    const evaluated = eval(toEval)
      let embed = new MessageEmbed()
        .setColor(0x36393e)
        .setTimestamp()
        .setTitle('Eval')
        .addField(" 🔽 Input: ", `\`\`\`js\n ${beautify(toEval, { format: "js" })} \`\`\``)
        .addField("🔼 Output", evaluated)
        .addField("Type of: ", typeof (evaluated))
        .setThumbnail(client.user.displayAvatarURL())
      message.channel.send(embed)
    } 
    catch (e) {
      const Post = new MessageEmbed()
        .setColor(0x36393e)
        .setTitle("ERROR")
        .setTimestamp()
        .setDescription(e)
      message.channel.send(Post)
    }
  }else{
    message.channel.send(`❌ You don't have Permission to do this.`).then(m => m.delete({ timeout: 5000 }))
  }
  
  }
}