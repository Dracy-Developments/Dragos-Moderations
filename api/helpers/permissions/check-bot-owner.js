module.exports = {


  friendlyName: 'permissionss.checkBotOwner',


  description: 'Check to see if the author of a message is the owner of the bot. Error if not.',


  inputs: {
    message: {
      type: "ref",
      required: true,
      description: "The message of the command",
    },
  },


  exits: {

  },


  fn: async function (inputs) {
    if (!sails.config.custom.discord.clientOwners.includes(inputs.message.author.id)) {
      throw new Error(`This command may only be used by the bot owner`);
    }
  }


};

