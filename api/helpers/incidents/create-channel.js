module.exports = {
  friendlyName: "incidents.createChannel",

  description: "Create a Discord incidents channel and return it.",

  inputs: {
    type: {
      type: "string",
      required: true,
      isIn: ["support", "interrogation", "discipline", "inactive", "inquiry", "welcome"],
      description: "The type of the incident channel.",
    },
    guild: {
      type: "ref",
      required: true,
      description: "The guild to initiate the channel.",
    },
    members: {
      type: "ref",
      description:
        "Array of members involved in automatic functionality for this channel (support/inquiry = initiator, interrogation/discipline/inactive = involved members)",
    },
  },

  fn: async function (inputs) {
    var guildSettings = await inputs.guild.settings();

    // Cannot create one of the incidents category is not set!
    if (!guildSettings.incidentsCategory) {
      await sails.helpers.events.warn(
        `Discord: cannot create ${type} incident channel for guild ${guild.name} because no incidentsCategory was set.`
      );
      return;
    }

    var memberString = [];
    var overwrites = [];

    // DISABLED: For now, we are instructing members to set these permissions on the incidents category themselves.

    /*
    // Grant staff permissions on inquiry
    if (["inquiry"].includes(inputs.type) && guildSettings.staffRole) {
      overwrites.push({
        id: guildSettings.staffRole,
        allow: [
          "ADD_REACTIONS",
          "VIEW_CHANNEL",
          "SEND_MESSAGES",
          "MENTION_EVERYONE",
          "EMBED_LINKS",
          "ATTACH_FILES",
          "READ_MESSAGE_HISTORY",
        ],
        type: "role",
      });
    }

    // Grant mod permissions on everything
    if (guildSettings.botModRole) {
      overwrites.push({
        id: guildSettings.botModRole,
        allow: [
          "ADD_REACTIONS",
          "VIEW_CHANNEL",
          "SEND_MESSAGES",
          "MANAGE_MESSAGES",
          "MENTION_EVERYONE",
          "MANAGE_ROLES",
          "EMBED_LINKS",
          "ATTACH_FILES",
          "READ_MESSAGE_HISTORY",
        ],
        type: "role",
      });
    }
    */

    // Add permissions for each provided member, and add them to the channel topic for automation
    if (inputs.members && inputs.members.forEach) {
      inputs.members.forEach((member) => {
        memberString.push(member.id);
        overwrites.push({
          id: member.id,
          options: {
            ADD_REACTIONS: true,
            VIEW_CHANNEL: true,
            SEND_MESSAGES: true,
            EMBED_LINKS: true,
            ATTACH_FILES: true,
            READ_MESSAGE_HISTORY: true,
          },
        });
      });
    }

    // Create the channel
    var channel = await inputs.guild.channels.create(
      `${inputs.type}-${await sails.helpers.uid()}`,
      {
        type: "text",
        topic: `${inputs.type} channel. Members (used by bot): |${memberString.join("|")}|`,
        parent: guildSettings.incidentsCategory,
        rateLimitPerUser: 15,
      }
    );

    // Sync default permissions
    await channel.lockPermissions();

    // Now apply overwrites
    var maps = overwrites.map(async (overwrite) => {
      await channel.updateOverwrite(
        overwrite.id,
        overwrite.options,
        `${inputs.type} channel`
      );
    });
    await Promise.all(maps);

    return channel;
  },
};
