const {
    MessageEmbed,
} = require(`discord.js`);
const fetch = require(`node-fetch`);

module.exports = {
    name: "duck",
    aliases: [``],
    run: async (client, message) => {

        const { url } = await fetch('https://random-d.uk/api/v2/random').then(response => response.json());
        const embed = new MessageEmbed()
            .setTitle(`🦆 Quack!`)
            .setImage(url)
            .setColor(`RANDOM`);
        message.channel.send(embed);
    },
};