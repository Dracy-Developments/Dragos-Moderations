module.exports = {


  friendlyName: 'Kill',


  description: 'Kill the bot process.',


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
    // Delete the original command message
    inputs.message.delete();

    // This command may only be used by the bot owner
    await sails.helpers.permissions.checkBotOwner(inputs.message);

    // Exit the process
    await inputs.message.channel.send(`The bot will commit death`);
    process.exit();
  }


};

