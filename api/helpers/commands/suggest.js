module.exports = {


  friendlyName: 'suggest',


  description: 'Make a suggestion for the bot.',


  inputs: {
    message: {
      type: "ref",
      required: true,
      description: "The message that triggered the command",
    },
    suggestion: {
      type: "string",
      required: true,
      description: "The suggestion the user wants to suggest.",
      maxLength: 1024,
    },
  },


  exits: {},


  fn: async function (inputs) {
    inputs.message.delete();
            const suggestion = new Discord.MessageEmbed()
            .setTitle(`New Suggestion for Drago's Moderation!`)
            .setColor(`#800FF`)
            .setDescription(inputs.suggestion)
            .setAuthor(`${inputs.message.author.username}`, `${inputs.message.author.displayAvatarURL({ dynamic: true })}`)
            .setThumbnail(`https://cdn.discordapp.com/emojis/726113039912403005.png?v=1`);
            inputs.message.channel.send(`☑️ Your Suggestion has Been posted`).then(m => m.delete({ timeout:5000 }));
            Client.channels.cache.get(`722355084931104810`).send(suggestion).then(async m => {
                await m.react(`✅`);
                await m.react(`❌`);
            });
  }


};

