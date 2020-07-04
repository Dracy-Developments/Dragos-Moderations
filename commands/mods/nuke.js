module.exports = {
    name: "nuke",
    category: "moderation",
    description: "deletes and remake the channel",
    usage: " ",
    aliases: [`lostnuke`],
    run: async (client, message) => {
        if (!message.member.hasPermission(`MANAGE_CHANNELS`)) {
            message.channel.send(`You don't have Permission to do this.`)
                .then(m => m.delete({
                    timeout: 5000,
                }));
            return;
        }

        const filter = (reaction, user) => reaction.emoji.name === '👌' && user.id === message.author.id;
        message.channel.send(`Ya Sure About that Chief?\n If you're 100% sure then react 👌 to this message`).then(confirmation => {
            confirmation.react(`👌`);
            confirmation.awaitReactions(filter, {
                time: 15000,
                max: 1,
                errors: ['time'],
            }).then(collected => {
                if (collected.first().emoji.name === `👌`) {
                    const post = message.channel.position;
                    message.channel.clone()
                        .then(newchan => {
                            newchan.setPosition(post);
                            message.channel.delete();

                        });
                }
            });
        });
    },
};