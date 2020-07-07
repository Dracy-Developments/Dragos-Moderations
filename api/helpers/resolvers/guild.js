module.exports = {
  friendlyName: "resolvers.guild",

  description: "Resolve a snowflake to a Discord guild.",

  inputs: {
    snowflake: {
      type: "string",
      required: true,
    },
  },

  fn: async function (inputs) {
    const guild = sails.config.custom.discord.regex.snowflake.test(
      inputs.snowflake
    )
      ? Client.guilds.resolve(inputs.snowflake)
      : null;
    if (guild) return guild;

    throw new Error(`Invalid guild: ${inputs.snowflake}`);
  },
};
