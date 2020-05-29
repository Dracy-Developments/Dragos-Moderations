const { MessageEmbed } =  require(`discord.js`)
const beautify = require("beautify");

module.exports = {
  name: "exec",
  category: "devs",
  description: "Execute something in the terminal",
  usage: "<input to the terminal>",
  run: async (client, message, args) => {
    if (!message.author.id === `563854476021334047` || !message.author.id === `163164447848923136`) {
        message.channel.send(`❌ You are not are not Drago or Lost \n🤦 SMH ${message.author.username} You an Disappointed`);
        return;
      }
  
      if (!args[0]) {
        return message.channel
          .send("❌ This Bitch is Empty YEET!")
          .then(m => m.delete({ timeout : 5000}));
      }
  
      
        if (
          args
            .join(" ")
            .toLowerCase()
            .includes("token")
        )
        return;
        
            const toEval = args.join(" ")
            const evaluated = exec(toEval)
try{
            let embed = new MessageEmbed()
            .setColor('PURPLE')
            .setTimestamp()
            .setTitle('Eval')
            .addField(" 🔽 Input: ", `\`\`\`js\n ${beautify(toEval, { format: "js" })} \`\`\``)
            .addField("🔼 Output", evaluated)
            .addField("Type of: ", typeof (evaluated))
            .setFooter(`Credits to LostNuke ❤️❤️❤️`)
           message.channel.send(embed)
        } catch (e) {
            const Post = new MessageEmbed()
                .setColor('#0099ff')
                .setTitle("ERROR")
                .setTimestamp()
                .setDescription(e)
                .setFooter(`Credits to LostNuke ❤️❤️❤️`)
                message.channel.send(Post)
        }
}
}