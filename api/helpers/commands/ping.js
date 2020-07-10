module.exports = {


  friendlyName: 'Ping',


  description: 'Ping Discord and check for ws and message latency.',


  inputs: {
    message: {
      type: "ref",
      required: true,
      description: "The message that triggered the command",
    },
  },


  exits: {

  },


  fn: async function (inputs) {
    inputs.message.delete();

    const embed = new Discord.MessageEmbed()
            .setTitle(`Flying...`);
        const msg = await inputs.message.channel.send(embed);
        const api = `${Math.round(Client.ws.ping)}ms`;
        const uembed = new Discord.MessageEmbed()
            .setTitle(`Pong!`)
            .setImage(`https://cdn.discordapp.com/attachments/645319050368647241/714630667131945010/tenor.gif`)
            .addField(`ws/API Latency`, `${api}`)
            .addField(`Message Latency`, `${msg.createdAt - inputs.message.createdAt}ms`)
            .setColor(0x36393e);
        msg.edit(uembed);
  }


};

