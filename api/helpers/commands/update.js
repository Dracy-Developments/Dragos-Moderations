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
        `${inputs.message.author.tag}`,
        `${inputs.message.author.displayAvatarURL()}`
      )
      .setTitle(`Update - Updating bot...`)
      .setColor(`BLUE`)
      .setDescription(`This may take a bit...`)
      .setTimestamp()
      .setFooter(`User ID: ${inputs.message.author.id}`);
    var message = await inputs.message.channel.send(embed);

    // Execute the update script
    let result = await sails.helpers.process.execute("sh update.sh");

    // Send the result
    if (result[0]) {
      throw new Error(result[0]);
    } else {
      const complete = new Discord.MessageEmbed()
        .setAuthor(
          `${inputs.message.author.tag}`,
          `${inputs.message.author.displayAvatarURL()}`
        )
        .setColor(`#8800FF`)
        .setTitle(`Update - Bot was updated!`)
        .setDescription(
          `You may now use the reload command to reload the bot with the New Features. \n \`\`\`${response}\`\`\``
        )
        .setTimestamp()
        .setFooter(`User ID: ${inputs.message.author.id}`);
      message.edit(complete);
    }
  },
};
