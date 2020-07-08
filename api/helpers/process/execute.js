const exec = require("child_process").exec;

module.exports = {
  friendlyName: "Execute",

  description: "Execute a command in the terminal. Returns [error, stdout].",

  inputs: {
    command: {
      type: "string",
      required: true,
      description: "The command to execute in the terminal",
    },
  },

  exits: {},

  fn: function (inputs) {
    return new Promise((resolve) => {
      // eslint-disable-next-line no-unused-vars
      exec(inputs.command, async (err, stdout, stderr) => {
        if (err != null) {
          resolve([err, null]);
        } else if (typeof stderr != "string") {
          resolve([stderror, null]);
        } else {
          resolve([null, stdout]);
        }
      });
    });
  },
};
