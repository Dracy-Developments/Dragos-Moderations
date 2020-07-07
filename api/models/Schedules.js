/**
 * Schedules.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    uid: {
      type: 'string',
      unique: true,
      required: true
    },

    task: {
      type: 'string',
      required: true,
      description: "The name of the task to run in helpers.tasks"
    },

    data: {
      type: 'json',
      description: "An object of parameters to pass to the tasks helper."
    },

    lastRun: {
      type: 'string',
      allowNull: true,
      description: "Date/time this task last ran."
    },

    nextRun: {
      type: 'string',
      allowNull: true,
      description: 'Date/time this task should run next'
    },

    catchUp: {
      type: 'boolean',
      defaultsTo: true,
      description: "Whether or not this task should fire if we go past scheduled time and the bot was offline."
    },

    cron: {
      type: 'string',
      allowNull: true,
      description: "If a recurring task, the CRON syntax for the recurrance."
    }

  },

  afterCreate: function (newlyCreatedRecord, proceed) {

    // Schedule the new schedule in cron
    sails.helpers.schedules.add(newlyCreatedRecord).exec(() => { });

    return proceed()
  },

  afterUpdate: function (updatedRecord, proceed) {

    // Re-schedule the schedule in cron
    sails.helpers.schedules.add(updatedRecord).exec(() => { });

    return proceed()
  },

  afterDestroy: function (destroyedRecord, proceed) {

    // Remove the schedule from cron
    sails.helpers.schedules.remove(destroyedRecord).exec(() => { });

    return proceed()
  }

};

