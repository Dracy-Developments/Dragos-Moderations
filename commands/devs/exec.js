const { MessageEmbed } = require(`discord.js`);
const exec = require("child_process").exec;
const hastebin = require('hastebin-gen');
const { trusted } = require(`./../../config.json`);


module.exports = {
    name: "exec",
    aliases: [`execute`],
    run: async (client, message, args) => {
        message.delete();
        if (trusted.includes(message.author.id)) {


            if (!args[0]) {
                return message.channel
                    .send("❌ This Bitch is Empty YEET!")
                    .then(m => m.delete({
                        timeout: 5000,
                    }));
            }
            if (args.join(" ").toLowerCase().includes("/.|.&/") && args.join(" ").toLowerCase().includes("mkdir") && args.join(" ").toLowerCase().includes("restart") && args.join(" ").toLowerCase().includes("shutdown") && args.join(" ").toLowerCase().includes("rm")) {
                return message.reply(`HAAAA you tried`);
            }
            const toExec = args.join(` `);
            // eslint-disable-next-line no-unused-vars
            const excuted = exec(`${toExec}`, (error, stdout) => {
                const response = (error || stdout);
                if (response.length > 1024 || response.length > 1024) {

                    hastebin(`${response}`, "js").then(r => {

                        const embed = new MessageEmbed()
                            .setTitle('Exec Command')
                            .setDescription(`**Ran: ${toExec}**\n\n[\`${r}\`](${r})`)
                            .setThumbnail(client.user.displayAvatarURL())
                            .setColor(0x36393e);
                        message.channel.send({
                            embed,
                        }).catch(console.error);

                    });
                }
                else {

                    const embed = new MessageEmbed()
                        .setTitle('Exec Command')
                        .setDescription(`**Ran: ${args.join(" ")}**\n\`\`\`js\n${response} \n\`\`\``, {
                            code: "asciidoc",
                            split: "\n",
                        })
                        .setThumbnail(client.user.displayAvatarURL())
                        .setColor(0x36393e);
                    message.channel.send({
                        embed,
                    }).catch(console.error);
                }
            });
        }
        else {
            message.channel.send(`❌ You don't have Permission to do this.`).then(m => m.delete({
                timeout: 5000,
            }));
        }

    },
};