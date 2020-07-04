const fs = require("fs");
const { MessageEmbed } = require("discord.js");
const { trusted } = require(`./../../config.json`);


module.exports = {
    name: "setup",
    aliases: [``],
    run: async (client, message) => {
        if(trusted.includes(message.author.id)) {
            message.delete();
            const settings = require(`./../../data/guild/${message.guild.id}/settings.json`);
            const embed = new MessageEmbed()
                .setTitle(`Setting up Drago's Moderations...`)
                .setription(`<a:loading:728034147351920671> Setting Up the Prefix`)
                .setColor(`#8800FF`)
                .setFooter(`This Quick Setup Process is Being Handled by ${message.author.username}`, `${message.author.displayAvatarURL({ dynamic: true })}`)
                .setThumbnail(`${client.user.displayAvatarURL()}`);
            message.channel.send(embed).then(status =>{
                const question = new MessageEmbed()
                    .setTitle(`What should be the Bot's Prefix?`)
                    .setDescription(`Please Send a New Mesage to set it as your new Prefix\n\n\n\n**By Default**: The prefix is \`J>\`\n**Note**: You can change the bot's Prefix at any time with \`J>prefix <prefix>\` and if you'd liked to use the deault prefix you may reply with \`none\` or \`default\`\n`)
                    .setColor(`#8800FF`)
                    .setFooter(`This quick Setup Process is Being Handled by ${message.author.username}`, `${message.author.displayAvatarURL({ dynamic: true })}`);
                message.channel.send(question).then(a => {
                    const filter = msg => message.author.id === msg.author.id;
                    a.channel.awaitMessages(filter, { max: 1, time: 30000, errors:["time"] }).then(b => {
                        if(b.first().content.toLowerCase == "none" || b.first().content.toLowerCase == "default") {
                            settings.prefix = `J>`;
                        }
                        else{
                            settings.prefix = `${b.first().content}`;
                        }
                        fs.writeFileSync(`./data/guild/${message.guild.id}/settings.json`, JSON.stringify(settings));
                        b.first().react(`✅`);
                        embed
                            .setTitle(`Setting up Drago's Moderations...`)
                            .setDescription(`✅ Prefix is Now Setup \nSetting Up the Mute Role`);
                        status.edit(embed);
                        const questionTwo = new MessageEmbed()
                            .setTitle(`What is the Mute Role?`)
                            .setDescription(`Please mention the mute role or the mute role's id \n\n\n\n**Note**: If the mute role does not exist the bot will create you automatically when executing the mute command but it's **Highly** Suggested that you have your own Mute Role with Permissions/Channels setup because the role that comes with the bot automatically will make it so The person who's is muted cannot see any channels in the server`)
                            .setColor(`#8800FF`)
                            .setFooter(`This quick Setup Process is Being Handled by ${message.author.username}`, `${message.author.displayAvatarURL({ dynamic: true })}`);
                        message.channel.send(questionTwo).then(c => {
                            c.channel.awaitMessages(filter, { max: 1, time: 30000, errors:["time"] }).then(d => {
                                if(message.guild.roles.cache.get(`${d.first().content}`) || d.first().mentions.roles.first().id) {
                                    settings.muteRole = `${d.first().content}`;
                                    fs.writeFileSync(`./data/guild/${message.guild.id}/settings.json`, JSON.stringify(settings));
                                    b.first().react(`✅`);
                                }
                            }).catch(() => {
                                c.delete();
                                embed
                                    .setDescription(`✅ Prefix is Setup \n❌ Setting Up the Mute Role ( Failed Took too Long Try Again)`)
                                    .setColor(`#ee110f`)
                                    .setTitle(`Setup Failed!`);
                                status.edit(embed);
                            });
                        });
                    }).catch(() => {
                        a.delete();
                        embed
                            .setDescription(`❌ Setting Up the Prefix ( Failed Took too Long Try Again)`)
                            .setColor(`#ee110f`)
                            .setTitle(`Setup Failed!`);
                        status.edit(embed);
                    });
                });
            });
        }
        else{
            message.channel.send(`❌ You don't have Permission to do this.`);
        }
    },
};