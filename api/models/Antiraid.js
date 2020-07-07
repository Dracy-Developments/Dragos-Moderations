/**
 * Antiraid.js
 *
 * @description :: Guild antiraid system.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    guildID: {
      type: "string",
      required: true,
      unique: true,
      description: "The ID of the guild",
    },

    /*
      CURRENT STATES
      */

    score: {
      type: "number",
      min: 0,
      defaultsTo: 0,
      description: "The current raid score for the guild.",
    },

    welcomeGate: {
      type: "boolean",
      defaultsTo: false,
      description:
        "Whether or not welcome gating mitigation (new members cannot get verified role) is activated.",
    },

    inviteWipe: {
      type: "boolean",
      defaultsTo: false,
      description:
        "Whether or not invite mitigation is activated (bot will delete invite links when activated).",
    },

    lockdown: {
      type: "boolean",
      defaultsTo: false,
      description:
        "Whether or not the guild is on lockdown (non-staff cannot send any messages except in excluded channels).",
    },

    /*
      SETTINGS - THRESHOLDS
      */

    phoneVerificationThreshold: {
      type: "number",
      defaultsTo: 0,
      min: 0,
      description:
        "The score threshold to enable phone verification requirement. 0 = disabled.",
    },

    welcomeGateThreshold: {
      type: "number",
      defaultsTo: 0,
      min: 0,
      description:
        "The score threshold to enable welcome gating (members cannot get verified until this mitigation is disabled). 0 = disabled.",
    },

    inviteWipeThreshold: {
      type: "number",
      defaultsTo: 0,
      min: 0,
      description:
        "The score threshold to wipe all invite links (and keep wiping until this mitigation is disabled). 0 = disabled.",
    },

    lockdownThreshold: {
      type: "number",
      defaultsTo: 0,
      min: 0,
      description:
        "The score threshold to lock down the entire guild (non-staff cannot send messages; certain channels can be excluded in settings). 0 = disabled.",
    },

    /*
      SETTINGS - SCORES
      */

    decay: {
      type: "number",
      min: 0,
      defaultsTo: 1,
      description: "Amount of score decayed per minute.",
    },

    newMemberScore: {
      type: "number",
      min: 0,
      defaultsTo: 0,
      description:
        "The amount of score to add each time a member joins the guild.",
    },

    warnScore: {
      type: "number",
      min: 0,
      defaultsTo: 0,
      description: "The amount of score to add each time a member is warned.",
    },

    muteScore: {
      type: "number",
      min: 0,
      defaultsTo: 0,
      description:
        "The amount of score to add each time a member is muted via discipline.",
    },

    banScore: {
      type: "number",
      min: 0,
      defaultsTo: 0,
      description: "The amount of score to add each time a member gets banned.",
    },

    antispamScore: {
      type: "number",
      min: 0,
      defaultsTo: 0,
      description:
        "The amount of score to add each time a member gets disciplined by the antispam system.",
    },
  },
};
