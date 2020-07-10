module.exports = {


  friendlyName: 'Credits',
  description: 'Show\'s a list of people who helped out with the Drago\'s Moderation Bot Development.',


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
    const credits = new Discord.MessageEmbed()
    .setAuthor(`Drago's Moderation - Credits`, `${Client.user.displayAvatarURL()}`)
    .setDescription(`**Sector Seven#3820** - Migrated Drago's Moderation to Sails.js and Helped out Developing Drago's Moderations\n\n**Shadowplays4k#6969**, **LostNuke#9114** & **codic#3754** - Help out Develop Drago's Moderations\n\n **Chan#8808** & **That Duck David#9502** - Support & Helped out Drago's Moderation with Suggestions and Feedbacks During the Development of Drago's Moderations`)
    .setColor(`#8800FF`)
    .setTimestamp()
    .setFooter(`Bot Creator: ${Client.users.cache.get(`563854476021334047`).tag}`, Client.users.cache.get(`563854476021334047`).displayAvatarURL({ dynamic: true }))
    inputs.message.channel.send(credits)
  }


};

