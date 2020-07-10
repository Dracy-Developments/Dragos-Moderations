const fetch = require(`node-fetch`);

module.exports = {


  friendlyName: 'Duck',
  description: 'An easter egg command that was requested by That Duck David.',


  inputs: {
    message: {
      type: "ref",
      required: true,
      description: "The message that triggered the command",
    },
  },


  exits: {},


  fn: async function (inputs) {
    const { url } = await fetch('https://random-d.uk/api/v2/random').then(response => response.json());
    const embed = new Discord.MessageEmbed()
        .setTitle(`🦆 Quack Quack!`)
        .setImage(url)
        .setColor(`RANDOM`);
    inputs.message.channel.send(embed);
  }


};

