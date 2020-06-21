const {
    MessageEmbed,
} = require(`discord.js`);

module.exports = {
    name: "debate",
    aliases: [``],
    run: async (client, message) => {
        if(message.member.hasPermission(`MANAGE_MESSAGES`) && message.guild.id === "661723444496564234") {
            const embed = new MessageEmbed()
            .setTitle(`Beefy Discussion Alert!`)
            .addField(`\u200b`, `\u200b <a:fiire:724048651244142694> <a:fiire:724048651244142694> <a:fiire:724048651244142694> #⎸〖:cut_of_meat:〗beefy-discussion <a:fiire:724048651244142694> <a:fiire:724048651244142694>  <a:fiire:724048651244142694>`)
            .addField(`\u200b`, `---------------------------------------------------------------------------------`)
            .addField(`\u200b`, `Wanna have a beefy debate? cross over the line!`);
            message.channel.send(embed);
        }
else{
        message.reply(`:x: No Permissions `);
        }
    },
};