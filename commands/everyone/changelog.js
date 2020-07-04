const { MessageEmbed } = require("discord.js");
const { version } = require(`../../package.json`);

module.exports = {
    name: "changelog",
    aliases: [``],
    run: async (client, message) => {

        const embed = new MessageEmbed()
            .setDescription(`**What's new in Version ${version}**\n\n 👉 Made the Changelog Command Accessible to Everyone\n👉 Added \`J>suggest\`( **__WORK IN PROGRESS__** ) where you can make a suggestion\n👉 You can ban members that arean't in your guild!\n👉 Added setup command \`J>setup\` ( **__WORK IN PROGRESS__**)`)
            .setColor(`#6300ea`)
            .setTimestamp()
            .setThumbnail(`${client.user.displayAvatarURL({ dynamic:true })}`)
            .setFooter(`The Changelog was requested by ${message.author.username}`, `${message.author.displayAvatarURL({ dynamic: true })}`);
        message.channel.send(embed);

    },
};