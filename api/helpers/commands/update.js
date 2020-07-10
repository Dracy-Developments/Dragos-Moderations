module.exports = {
  friendlyName: "Update",

  description: "Update the bot.",

  inputs: {
    message: {
      type: "ref",
      required: true,
      description: "The message that triggered the command",
    },
  },

  exits: {},

  fn: async function (inputs) {
    // Delete the original command message
    inputs.message.delete();

    // This command may only be used by the bot owner
    await sails.helpers.permissions.checkBotOwner(inputs.message);

    // Pre-send a message
    const embed = new Discord.MessageEmbed()
      .setAuthor(
        `Drago's Moderation - Update`,
        `${Client.user.displayAvatarURL()}`
      )
      .setColor(`BLUE`)
      .setDescription(`Updating... \n\n This may take a bit...`)
      .setFooter(
        `Update was requested by ${inputs.message.author.username}`,
        `${inputs.message.author.displayAvatarURL({ dynamic: "true" })}`
      );
    var message = await inputs.message.channel.send(embed);

    // Execute the update script
    let result = await sails.helpers.process.execute("sh update.sh");

    // Send the result
    if (result[0]) {
      throw new Error(result[0]);
    } else {
      const complete = new Discord.MessageEmbed()
        .setAuthor(
          `Drago's Moderation - Update`,
          `${Client.user.displayAvatarURL()}`
        )
        .setColor(`#8800FF`)
        .setDescription(
          `You May Now use the reload command to reload the bot with the New Features \n \`\`\`${response}\`\`\``
        )
        .setFooter(
          `Update was requested by ${inputs.message.author.username}`,
          `${inputs.message.author.displayAvatarURL({ dynamic: "true" })}`
        );
      message.edit(complete);
    }
  },
};
