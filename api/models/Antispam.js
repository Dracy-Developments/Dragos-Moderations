/**
 * Antispam.js
 *
 * @description :: Guild antispam system
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    guildID: {
      type: "string",
      required: true,
      unique: true,
      description: "The ID of the guild these member settings belong to.",
    },

    /*
      BASIC SETTINGS
      */

    enabled: {
      type: "boolean",
      defaultsTo: false,
      description: "Is the antispam system enabled for this guild?",
    },

    flagThreshold: {
      type: "number",
      defaultsTo: 30,
      description:
        "When a sent message has a spam score of this or higher, it will be flagged in the configured anti9spam flag channel.",
    },

    flagChannel: {
      type: "string",
      allowNull: true,
      description:
        "The text channel where the bot will post messages with a spam score equal to or greater than flagThreshold.",
    },

    threshold: {
      type: "number",
      defaultsTo: 100,
      description:
        "The number of spamScore at which a member is nudged/mentioned by the bot to stop spamming. If they continue, they will be auto-modded.",
    },

    decayFast: {
      type: "number",
      isInteger: true,
      defaultsTo: 33,
      min: 0,
      description:
        "The number of spamScore removed per minute from a member spamScoreFast.",
    },

    decaySlow: {
      type: "number",
      isInteger: true,
      defaultsTo: 1,
      min: 0,
      description:
        "The number of spamScore removed per minute from a member spamScoreSlow.",
    },

    /*
      FAST SCORE SETTINGS
      */

    mutedMultiplier: {
      type: "number",
      min: 0,
      defaultsTo: 1.5,
      description:
        "If a member has the configured muted role, their message spam score will be multiplied by this.",
    },

    lessStrictRoleMultiplier: {
      type: "number",
      min: 0,
      defaultsTo: 0.75,
      description:
        "If a member has a configured less strict spam role, their message spam score will be multiplied by this.",
    },

    lessStrictChannelMultiplier: {
      type: "number",
      min: 0,
      defaultsTo: 0.75,
      description:
        "If a member sends a message in a less strict channel, their message spam score will be multiplied by this.",
    },

    baseScore: {
      type: "number",
      min: 0,
      defaultsTo: 1,
      description: "The score added for every message sent",
    },

    mentionScore: {
      type: "number",
      min: 0,
      defaultsTo: 5,
      description: "Amount of score added for every user or role mention used.",
    },

    everyoneHereScore: {
      type: "number",
      min: 0,
      defaultsTo: 25,
      description:
        "Amount of score added if an everyone or here mention was used.",
    },

    embedsScore: {
      type: "number",
      min: 0,
      defaultsTo: 5,
      description: "Amount of score added for every embed used.",
    },

    attachmentScore: {
      type: "number",
      min: 0,
      defaultsTo: 10,
      description: "Amount of score added for every attachment used.",
    },

    charactersPerSecond: {
      type: "number",
      min: 0,
      defaultsTo: 10,
      description:
        "If the charactersPerSecond rate between this message and the previous message sent by the user is this or more, add score depending on how high the rate was (copy paste spam).",
    },

    messageHistoryMinutes: {
      type: "number",
      min: 0,
      defaultsTo: 3,
      description:
        "For similarity, any messages sent within the last this many minutes will be compared to for similarity.",
    },

    similarityPercent: {
      type: "number",
      min: 0,
      max: 100,
      defaultsTo: 80,
      description:
        "If a message sent is this percent or more similar to any other messages sent in the same channel within the last messageHistoryMinutes, spam score will be added depending on amount of similarity and length of message.",
    },

    similarityScore: {
      type: "number",
      min: 0,
      defaultsTo: 64,
      description:
        "If a message is similarityPercent similar to another message sent within messageHistoryMinutes, 5 spam score will be added plus an additional 1 spam score every similarityScore characters long the message is.",
    },

    shoutPercent: {
      type: "number",
      min: 0,
      max: 100,
      defaultsTo: 50,
      description:
        "If a message is this percent uppercase letters, it is shout spam and will be given score depending on number of uppercase characters.",
    },

    shoutScore: {
      type: "number",
      min: 0,
      defaultsTo: 10,
      description:
        "If a message has shoutPercent or more uppercase characters, 1 spam score will be added for every this many uppercase characters in total in the message.",
    },

    repeatCharacters: {
      type: "number",
      min: 0,
      isInteger: true,
      defaultsTo: 5,
      description:
        "If there are at least this many repeating consecutive characters in a row, add repeatCharacters spam score.",
    },

    repeatCharactersScore: {
      type: "number",
      min: 0,
      isInteger: true,
      defaultsTo: 3,
      description:
        "Add 1 score plus an additional 1 spam score for every additional repeatCharactersScore characters long the chain is (for example, if repeatCharacters is 5 and repeatCharactersScore is 3, a message with 15 consecutive Rs will score 4.",
    },

    newLinesAllowedPerCharacters: {
      type: "number",
      min: 0,
      defaultsTo: 128,
      description:
        "For every newLinesAllowedPerCharacters long a message is, one new line is allowed. If there are too many new lines, score will be added depending on the charactersNewLinesRatio.",
    },

    newLinesScore: {
      type: "number",
      min: 0,
      defaultsTo: 3,
      description:
        "When the newLinesAllowedPerCharacters is violated, this much score will be added for every new line in the message.",
    },

    originalityPercent: {
      type: 'number',
      min: 0,
      max: 100,
      defaultsTo: 80,
      description: "If a message is less than originalityPercent original (that-is has more than (100-originalityPercent) percent repeating patterns of words/phrases), spam score will be added depending on message length and amount of repeat patterns."
    },

    profanityScore: {
      type: "number",
      min: 0,
      defaultsTo: 3,
      description: "For each very offensive word used, profanityScore will be added. Mildly offensive will add profanityScore/2. And slightly offensive will add profanityScore/4. Uses npm noswearing."
    }
  },
};
