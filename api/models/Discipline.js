/**
 * Discipline.js
 *
 * @description :: Manages discipline issued for moderation cases.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    case: {
      model: "Moderation",
      via: "case",
      required: true,
      description: "The case ID this discipline refers to.",
    },

    action: {
      type: "string",
      isIn: [
        "XP retraction",
        "Coin fine",
        "Violation points",
        "Channel ban",
        "Role added",
        "Role removed",
        "Cannot use voice channels",
        "Cannot give reputation",
        "Cannot use staff command",
        "Cannot report members",
        "Cannot use support command",
        "Cannot use conflict command",
        "Cannot purchase ads",
        "Cannot edit profile",
        "Task",
        "Mute",
        "Ban",
        "Note",
        "Other discipline",
      ],
      required: true,
      description: "The type of disciplinary action.",
    },

    data: {
      type: "json",
      defaultsTo: {},
      description: "The system data pertaining to this discipline.",
    },

    description: {
      type: "string",
      maxLength: 1024,
      description: "The description provided by the staff for this discipline.",
    },

    status: {
      type: "string",
      defaultsTo: "active",
      isIn: ["active", "appealed", "completed"],
      description: "Status of the discipline. Active = in effect. Appealed = removed/reversed. Completed (tasks etc) = member completed their tasks.",
    },
  },
};
