const { MessageEmbed } =  require(`discord.js`)
let exec = require("child_process").exec;
hastebin = require('hastebin-gen')

module.exports = {
  name: "exec",
  category: "devs",
  description: "Execute something",
  usage: "<something to execute>",
  aliases: [``],
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
  
      const toExec = args.join(` `)
      const excuted = exec(`${toExec}`,(error, stdout) => {
        const response = (error || stdout);
        if (response.length > 1024 || response.length > 1024) {
              
            hastebin(`${response}`, "js").then(r => {
                
              const embed = new MessageEmbed()
                .setTitle('Exec Command')
                .setDescription(`**Ran: ${toExec}**\n\n[\`${r}\`](${r})`)
                .setThumbnail(client.user.displayAvatarURL())
                .setColor(0x36393e)  
              message.channel.send({ embed }).catch(console.error);
              
            })
        } else {
          
          const embed = new MessageEmbed()
                .setTitle('Exec Command')
                .setDescription(`**Ran: ${args.join(" ")}**\n\`\`\`\js\n${response} \n\`\`\``, {code: "asciidoc", split: "\n"})
                .setThumbnail(client.user.displayAvatarURL())
                .setColor(0x36393e)  
              message.channel.send({ embed }).catch(console.error);
          
        }
      })
    }}
