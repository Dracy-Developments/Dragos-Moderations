/* eslint-disable no-empty */
/* eslint-disable no-trailing-spaces */
/* eslint-disable space-before-blocks */
const {
    trusted,
} = require(`./../../config.json`);
// const ConfigManager = require(`./../../util/guildBanning`);
const {
    MessageEmbed,
} = require(`discord.js`);

module.exports = {
    name: "test",
    aliases: [``],
    run: async (client, message, args) => {
        if (trusted.includes(message.author.id)) {
            if (message.guild.members.cache.get(args[0]) || message.mentions.members.first()) {
                const violator = message.guild.members.cache.get(args[0]) || message.mentions.members.first();
                message.delete();
                const punishMenu = new MessageEmbed()
                    .setTitle(`Warn Menu - Version: ALPHA`)
                    .setDescription(`\n🇦 Warn ${violator} \n🇧 Mute ${violator} \n🇨 Ban ${violator} \n🇩 Take Note on ${violator} \n🇪 View Cases on ${violator} \n🇫 Have a Discussion with ${violator}`);
                message.channel.send(punishMenu).then(async (a) => {
                    const filter = (reaction, user) => reaction.emoji.name === '🇦' || reaction.emoji.name === '🇧' || reaction.emoji.name === '🇨' || reaction.emoji.name === '🇩' || reaction.emoji.name === '🇪' || reaction.emoji.name === '🇫' || reaction.emoji.name === '⏹️' && user.id === message.author.id;
                    a.react(`🇦`);
                    await a.react(`🇧`);
                    await a.react(`🇨`);
                    await a.react(`🇩`);
                    await a.react(`🇪`);
                    await a.react(`🇫`);
                    await a.react(`⏹️`);
                    message.channel.startTyping();
                    a.awaitReactions(filter, {
                        time: 15000,
                        max: 1,
                        errors: ['time'],
                    }).then(collected => {
                        if (collected.first().emoji.name === `🇦`) {
                            message.channel.stopTyping();
                            console.log(`Warn Menu Stuff Goes Here`);
                        }
                        if (collected.first().emoji.name === `🇧`) {
                            message.channel.stopTyping();
                            console.log(`Mute Menu Stuff Goes Here`);
                        }
                        if (collected.first().emoji.name === `🇨`) {
                            message.channel.stopTyping();
                            console.log(`Ban Menu Stuff Goes Here`);
                        }
                        if (collected.first().emoji.name === `🇩`) {
                            message.channel.stopTyping();
                            console.log(`Note Menu Stuff Goes Here`);
                        }
                        if (collected.first().emoji.name === `🇪`) {
                            message.channel.stopTyping();
                            console.log(`Cases Menu Stuff Goes Here`);
                        }
                        if (collected.first().emoji.name === `🇫`) {
                            message.channel.stopTyping();
                            try{
                            message.guild.channels.create(`${violator.user.username}-${violator.user.discriminator}`, {
                                topic: `This channel is a Discusion Between Staff and ${violator.user.tag}`
                            }).then(chan => {
                                chan.send(`${violator}, Hello The Staff would like to discuss something with you`)
                            })
                        }catch(err){
                                message.channel.send(`❌ An Error Occured`)
                        }
                        }
                        if (collected.first().emoji.name === `⏹️`) {
                            message.channel.stopTyping();
                            a.delete();
                        }
                    }).catch(() => {
                        message.channel.stopTyping();
                        a.delete();
                        message.channel.send(`❌ You didn't choose an Option`).then(msg => msg.delete({ timeout: 5000 }));
                    });


        });

            }
 else {
                return message.channel.send(`❌ Please Specify the person you want to Punish Make sure you mention the user or include it's id`);
            }
        }
 else {
            message.channel.send(`❌ You don't have Permission to do this`);
        }

    },
};