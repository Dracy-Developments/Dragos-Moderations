module.exports = {
  friendlyName: "Prefix",

  description: "Change the bot prefix for your guild.",

  inputs: {
    message: {
      type: "ref",
      required: true,
      description: "The original message",
    },
    prefix: {
      type: "string",
      required: true,
      description: "The new prefix for the bot.",
    },
  },

  exits: {},

  fn: async function (inputs) {
    // Delete the original command message
    inputs.message.delete();

    // This command may only be used by the bot owner
    await sails.helpers.permissions.checkBotOwner(inputs.message);

    // Update the prefix in the database
    await sails.models.guilds.updateOne(
      { guildID: inputs.message.guild.id },
      { prefix: inputs.prefix }
    );

    // Return message
    const embed = new Discord.MessageEmbed()
      .setTitle(`Changed Prefix`)
      .setDescription(`The Prefix is now \`${inputs.prefix}\``)
      .setColor(`#8800FF`);
    return inputs.message.channel.send(embed);
  },
};
