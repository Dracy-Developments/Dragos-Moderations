module.exports = {
  friendlyName: "moderation.checkAction",

  description:
    "Check if a disciplinary action has been applied and is currently active on a member.",

  inputs: {
    moderation: {
      type: "ref",
      required: true,
      description: "The moderation logs to check",
    },
    action: {
      type: "string",
      required: true,
      description: "The action to check",
    },
  },

  fn: async function (inputs) {
    // filter out appealed mod logs
    var records = inputs.moderation.filter((log) => !log.appealed);

    var hasAction = false;

    // Go through every mod record and its discipline records to see if the action has been applied
    if (records && records.length > 0) {
      records.map((record) => {
        if (record.discipline && record.discipline.length > 0) {
          var _record = record.discipline.find(
            (discipline) =>
              discipline.action === inputs.action &&
              discipline.status === "active"
          );
          if (_record) hasAction = true;
        }
      });
    }

    return hasAction;
  },
};
