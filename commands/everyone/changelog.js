const {
    MessageEmbed,
} = require("discord.js");
const {
    version,
} = require(`../../package.json`);
module.exports = {
    name: "changelog",
    aliases: [``],
    run: async (client, message) => {
        if (message.author.id === `563854476021334047` || message.author.id === `163164447848923136`) {

            const embed = new MessageEmbed()
                .setTitle(`Changelog`)
                .addField(`Version`, `${version}`);

            message.channel.send(embed);
        }
 else {
            message.channel.send(`❌ You don't have Permission to do this.`);
        }
    },
};