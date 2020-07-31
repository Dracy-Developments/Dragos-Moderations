module.exports = {
  friendlyName: "helpers.roles.add",

  description: "Add a guild.settings role to a member.",

  inputs: {
    member: {
      type: "ref",
      required: true,
      description: "The member to add role to",
    },
    role: {
      type: "string",
      required: true,
      description: "The guildSettings key containing the role we want to add.",
    },
    reason: {
      type: "string",
      description: "The reason for adding this role.",
    },
  },

  fn: async function (inputs) {
    var guildSettings = await inputs.member.guild.settings();

    // Setting not set? Exit.
    if (!guildSettings[inputs.role]) return false;

    // Setting set, but role does not exist? Return false.
    if (!inputs.member.guild.roles.cache.has(guildSettings[inputs.role]))
      return false;

    // If the member has the role, return false.
    if (inputs.member.roles.cache.has(guildSettings[inputs.role])) return true;

    // If we reach here, add the role.
    await inputs.member.roles.add(guildSettings[inputs.role], inputs.reason);
    return true;
  },
};
