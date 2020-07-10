module.exports = {


  friendlyName: 'Check permission',


  description: 'Check if a member has a certain Discord permissions. Throw an error if they do not.',


  inputs: {
    message: {
      type: "ref",
      required: true,
      description: "The message of the command",
    },
    permission: {
      type: 'string',
      required: true,
      description: "The permission to check for."
    }
  },


  exits: {

  },


  fn: async function (inputs) {
    if (!inputs.message.member.hasPermission(inputs.permission)) {
      throw new Error(`This requires ${inputs.permission} permissions, but you do not have them!`);
    }
  }


};

