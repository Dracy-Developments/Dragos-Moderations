module.exports = {


  friendlyName: 'Changelog',
  description: 'Display Any changes that were made on the bot',


  inputs: {
    message: {
      type: "ref",
      required: true,
      description: "The message that triggered the command",
    },
  },


  exits: {},


  fn: async function (inputs) {
    inputs.message.delete();
    const changelog = new Discord.MessageEmbed()
    .setAuthor(`Changelog - Version 0.8 - Alpha`, `${Client.user.displayAvatarURL()}`)
    .setDescription(`**Changelog will be released in the __beta__ stage**`)
    .setColor(`#8800FF`)
    .setFooter(`Changelog was requested by ${inputs.message.author.username}`, `${inputs.message.author.displayAvatarURL({ dynamic:"true"})}`)
    .setTimestamp();
    inputs.message.channel.send(changelog)
  }


};

