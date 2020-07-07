/**
 * Moderation.js
 *
 * @description :: Moderation logs
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    case: {
      type: "string",
      required: true,
      unique: true,
      description: "The case ID for this moderation log.",
    },

    userID: {
      type: "string",
      required: true,
    },

    guildID: {
      type: "string",
      required: true,
    },

    type: {
      type: "string",
      isIn: [
        "note",
        "warning",
        "discipline",
        "antispam",
        "reflection",
        "restrictions",
        "ban",
        "investigation",
      ],
      required: true,
      description: "The type of discipline this is",
    },

    issuer: {
      type: "string",
      required: true,
      description: "The user ID of the person who issued this discipline.",
    },

    appealed: {
      type: "boolean",
      defaultsTo: false,
      description: "Whether or not this moderation action was appealed.",
    },

    schedule: {
      type: "string",
      allowNull: true,
      description:
        "The id of the schedule if one was created for this discipline.",
    },

    rules: {
      type: "json",
      required: true,
      description:
        "An array of rule numbers that the member violated in this discipline.",
    },

    reason: {
      type: "string",
      maxLength: 1024,
      description:
        "The full explanation of what the user did warranting this action.",
    },

    XP: {
      type: "number",
      min: 0,
      defaultsTo: 0,
      description: "Amount of XP that was taken away",
    },

    coins: {
      type: "number",
      min: 0,
      defaultsTo: 0,
      description: "Number of coins that were fined from the member.",
    },

    vpts: {
      type: "number",
      min: 0,
      defaultsTo: 0,
      description:
        "Number of violation points assigned to the member, if using vpts.",
    },

    channelRestrictions: {
      type: "json",
      description: "Array of channel IDs the member lost privileges to use.",
    },

    rolesAdded: {
      type: "json",
      description: "Array of role IDs added to this member.",
    },

    rolesRemoved: {
      type: "json",
      description: "Array of role IDs removed from this member.",
    },

    cannotUseVoiceChannels: {
      type: "boolean",
      defaultsTo: false,
      description:
        "True if this discipline prohibits the member from using any voice channels.",
    },

    cannotGiveReputation: {
      type: "boolean",
      defaultsTo: false,
      description:
        "True if this discipline prohibits the member from giving any reputation to other members.",
    },

    cannotUseStaffCommand: {
      type: "boolean",
      defaultsTo: false,
      description:
        "True if this discipline prohibits the member from using the staff command.",
    },

    cannotUseReportCommand: {
      type: "boolean",
      defaultsTo: false,
      description:
        "True if this discipline prohibits the member from using the report command.",
    },

    cannotUseSupportCommand: {
      type: "boolean",
      defaultsTo: false,
      description:
        "True if this discipline prohibits the member from using the support command.",
    },

    // TODO
    cannotUseConflictCommand: {
      type: "boolean",
      defaultsTo: false,
      description:
        "True if this discipline prohibits the member from using the conflict command.",
    },

    // TODO
    cannotPurchaseAds: {
      type: "boolean",
      defaultsTo: false,
      description:
        "True if this discipline prohibits the member from purchasing ads.",
    },

    cannotEditProfile: {
      type: "boolean",
      defaultsTo: false,
      description:
        "True if this discipline prohibits the member from editing their profile.",
    },

    apologies: {
      type: "json",
      description:
        "Array of string descriptors (such as usernames) of the people this member is required to write an apology to.",
    },

    research: {
      type: "json",
      description:
        "Array of research paper topics this member must write about.",
    },

    retractions: {
      type: "json",
      description: "Array of retraction statements this member must write.",
    },

    quizzes: {
      type: "json",
      description: "Array of quizzes this member must take.",
    },

    muteDuration: {
      type: "number",
      allowNull: true,
      description:
        "If this member is to be muted, the duration of the mute in minutes. Use 0 for indefinite.",
    },

    banDuration: {
      type: "number",
      allowNull: true,
      description:
        "If this member is to be banned, the amount of time the ban should last, in days. Use 0 for permanent.",
    },

    additionalInformation: {
      type: "string",
      maxLength: 1024,
      allowNull: true,
      description: "Additional information, such as other discipline issued.",
    },
  },
};
