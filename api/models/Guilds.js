/**
 * Guilds.js
 *
 * @description :: Guild settings.
 */

module.exports = {
  attributes: {
    // Make sure each attribute has a description! Some commands use them.

    guildID: {
      type: "string",
      required: true,
      unique: true,
      description: "The ID of the guild",
    },

    /*
      BASIC SETTINGS
      */

    prefix: {
      type: "string",
      allowNull: true,
      description: "A custom bot prefix for the guild",
    },

    disabledCommands: {
      type: "json",
      defaultsTo: [],
      description: "A list of command names that are disabled in this guild.",
    },

    // TODO: Muted is in members and mod logs

    /*
      ROLES
      */

    muteRole: {
      type: "string",
      allowNull: true,
      description:
        "The role assigned to members when muted. Ideally, this role should restrict the member from all channels except incidents and info channels.",
    },

    botManagerRole: {
      type: "string",
      allowNull: true,
      description:
        "Bot manager role is a role assigned to members who can perform administrative functions on the bot",
    },

    botModRole: {
      type: "string",
      allowNull: true,
      description:
        "Bot mod role is a role assigned to members who can perform moderation functions on the bot and are considered staff.",
    },

    verifiedRole: {
      type: "string",
      allowNull: true,
      description:
        "The role differentiating current members from new members (those without this role should have limited guild access especially if using antiraid).",
    },

    /*
      CHANNELS
      NOTE: Update commands/channel when you change these attributes!
      */

    incidentsCategory: {
      type: "string",
      allowNull: true,
      description:
        "The category where various staff incidents channels will be created for members to communicate privately with staff, such as for discipline.",
    },

    banLogChannel: {
      type: "string",
      allowNull: true,
      description:
        "The channel where ban notifications for staff will be posted (via guildBanAdd and guildBanRemove events)",
    },

    kickLogChannel: {
      type: "string",
      allowNull: true,
      description:
        "The channel where kick notifications for staff will be posted (via guildMemberRemove events)",
    },

    modLogChannel: {
      type: "string",
      allowNull: true,
      description:
        "The channel where mute notifications for staff will be posted (via the bot's discipline functions)",
    },

    publicModLogChannel: {
      type: "string",
      allowNull: true,
      description:
        "The channel where basic disciplinary notifications are posted for the public to see (so members know staff are doing their job)",
    },

    joinLogChannel: {
      type: "string",
      allowNull: true,
      description:
        "The channel where join notifications for staff will be posted (via the guildMemberAdd event)",
    },

    leaveLogChannel: {
      type: "string",
      allowNull: true,
      description:
        "The channel where leave notifications for staff will be posted (via the guildMemberRemove event)",
    },

    autoModLogChannel: {
      type: "string",
      allowNull: true,
      description:
        "The channel where auto moderation notifications for staff will be posted (via the Antispam or self moderation)",
    },

    channelLogChannel: {
      type: "string",
      allowNull: true,
      description:
        "The channel where channel delete logs and their cached messages for staff will be posted",
    },

    messageLogChannel: {
      type: "string",
      allowNull: true,
      description: "The channel where message logs for staff will be posted",
    },

    userLogChannel: {
      type: "string",
      allowNull: true,
      description:
        "The channel where changes to usernames, avatars, and statuses will be logged.",
    },

    generalChannel: {
      type: "string",
      allowNull: true,
      description:
        "The general channel where bot will post messages to members when there is no text channel specific to the action.",
    },

    announcementsChannel: {
      type: "string",
      allowNull: true,
      description:
        "The announcements channel for the guild where the bot will post guild-wide messages such as antiraid activations.",
    },

    /*
      FEATURES
      */

    reputationSystem: {
      type: "boolean",
      defaultsTo: false,
      description:
        "Enable a reputation system where members can give each other rep points displayed on their profile.",
    },

    reputationEmoji: {
      type: "string",
      allowNull: true,
      description:
        "If set, members can earn rep for qualifying messages. Qualifying messages will be reacted with this emoji by the bot, and the author will get rep for each member who reacts this emoji.",
    },

    selfModeration: {
      type: "number",
      defaultsTo: 0,
      min: 0,
      isInteger: true,
      description:
        "The number of reports against a member within selfModerationMinutes before they are auto-muted by the bot. 0 = disable self moderation.",
    },

    selfModerationMinutes: {
      type: "number",
      defaultsTo: 60,
      min: 1,
      isInteger: true,
      description:
        "The number of minutes a self moderation report is valid against a member.",
    },

    vptDecayXP: {
      type: "number",
      defaultsTo: 0,
      min: 0,
      description:
        "A member should decay 1 violation point (vpt) for every specified amount of XP earned (set to 0 to disable)",
    },

    vptDecayHours: {
      type: "number",
      defaultsTo: 0,
      min: 0,
      description:
        "A member should decay 1 violation point (vpt) for every specified number of hours they are in the guild (set to 0 to disable)",
    },

    welcomeIncidentText: {
      type: "string",
      maxLength: 1950,
      allowNull: true,
      columnType: "varchar(1950)",
      description:
        "If set, an incidents channel will be created for new members, and a message will be posted in it with this text. This is useful for private verification of new members before getting full guild access.",
    },

    // TODO: conflictSystem

    // TODO: ads
  },
};
