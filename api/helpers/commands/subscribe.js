module.exports = {
  friendlyName: "Subscribe",

  description: "Subscribe to various things.",

  inputs: {
    message: {
      type: "ref",
      required: true,
      description: "The message that triggered the command",
    },
    subscription: {
      type: "string",
      required: true,
      isIn: ["dmod", "api"],
      description: "What to subscribe to: dmod or api.",
    },
  },

  exits: {},

  fn: async function (inputs) {
    // Delete the original command message
    inputs.message.delete();

    // Reject if used outside of the support server.
    if (inputs.message.guild.id !== "722155065129041940") {
      throw new Error(
        `The subscribe command is only used for the Dracy's Developments guild.`
      );
    }

    // Configurables
    const dmodRole = `724055629827932160`;
    const apiRole = `726088138333618276`;

    switch (inputs.subscription) {
      case "dmod":
        if (inputs.message.member.roles.cache.get(dmodRole)) {
          await inputs.message.member.roles.remove(
            dmodRole,
            "Unsubscribed from dmod"
          );
          let embed = new Discord.MessageEmbed()
            .setAuthor(
              `Drago's Moderation - Subscribe`,
              `${Client.user.displayAvatarURL()}`
            )
            .setTitle(`You're No Longer Subscribed to dmod`)
            .setThumbnail(
              `https://media.discordapp.net/attachments/681019737030787125/724062231943184444/tenor.gif?width=269&height=201`
            )
            .setFooter(
              `Subscribe was requested by ${inputs.message.author.username}`,
              `${inputs.message.author.displayAvatarURL({ dynamic: "true" })}`
            )
            .setColor(`#8800FF`);
          inputs.message.channel.send(embed);
        } else {
          await inputs.message.member.roles.add(dmodRole, "Subscribed to dmod");
          let embed = new Discord.MessageEmbed()
            .setAuthor(
              `Drago's Moderation - Subscribe`,
              `${Client.user.displayAvatarURL()}`
            )
            .setTitle(`You're Now Subscribed to dmod`)
            .setThumbnail(
              `https://media.discordapp.net/attachments/681019737030787125/724062231586930719/tenor2.gif?width=408&height=408`
            )
            .setFooter(
              `Subscribe was requested by ${inputs.message.author.username}`,
              `${inputs.message.author.displayAvatarURL({ dynamic: "true" })}`
            )
            .setColor(`#8800FF`);
          inputs.message.channel.send(embed);
        }
        break;
      case "api":
        if (inputs.message.member.roles.cache.get(apiRole)) {
          await inputs.message.member.roles.remove(
            apiRole,
            "Unsubscribed from API"
          );
          let embed = new Discord.MessageEmbed()
            .setAuthor(
              `Drago's Moderation - Subscribe`,
              `${Client.user.displayAvatarURL()}`
            )
            .setTitle(`You're No Longer Subscribed to API`)
            .setThumbnail(
              `https://media.discordapp.net/attachments/681019737030787125/724062231943184444/tenor.gif?width=269&height=201`
            )
            .setFooter(
              `Subscribe was requested by ${inputs.message.author.username}`,
              `${inputs.message.author.displayAvatarURL({ dynamic: "true" })}`
            )
            .setColor(`#8800FF`);
          inputs.message.channel.send(embed);
        } else {
          await inputs.message.member.roles.add(apiRole, "Subscribed to API");
          let embed = new Discord.MessageEmbed()
            .setAuthor(
              `Drago's Moderation - Subscribe`,
              `${Client.user.displayAvatarURL()}`
            )
            .setTitle(`You're Now Subscribed to API`)
            .setThumbnail(
              `https://media.discordapp.net/attachments/681019737030787125/724062231586930719/tenor2.gif?width=408&height=408`
            )
            .setFooter(
              `Subscribe was requested by ${inputs.message.author.username}`,
              `${inputs.message.author.displayAvatarURL({ dynamic: "true" })}`
            )
            .setColor(`#8800FF`);
          inputs.message.channel.send(embed);
        }
        break;
    }
  },
};
