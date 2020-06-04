const { MessageEmbed } =  require(`discord.js`)
let exec = require("child_process").exec;
hastebin = require('hastebin-gen')

module.exports = {
  name: "exec",
  aliases: [`exe`],
  run: async (client, message, args) => {
    message.delete();
    if(message.author.id === `563854476021334047`||message.author.id ===`163164447848923136`){
			
  
      if (!args[0]) {
        return message.channel
          .send("❌ This Bitch is Empty YEET!")
          .then(m => m.delete({ timeout : 5000}));
      }
      if (args.join(" ").toLowerCase().includes("/.|.&/")
      )
        return;
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
          }else{
            message.channel.send(`❌ You don't have Permission to do this.`).then(m => m.delete({ timeout: 5000 }))
          }
        
    }}
