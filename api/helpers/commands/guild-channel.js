const { Client } = require("discord.js");

module.exports = {
  friendlyName: "guildChannel",

  description: "Set a channel setting for the guild.",

  inputs: {
    message: {
      type: "ref",
      required: true,
      description: "The message that triggered the command",
    },

    // TODO: Make a resolver that resolves a channel based on ID, mention, or name.
    overrideChannel: {
      type: "string",
      description:
        "Specify a specific channel or category ID if you do not want to use the one the command was executed in. Or, specify `null` to reset the channel setting you specify in the prompt.",
    },
  },

  exits: {},

  fn: async function (inputs) {
    // Delete the original command message
    inputs.message.delete();

    // This command may only be used by the bot owner
    // TODO: change this to a guild staff setting
    await sails.helpers.permissions.checkBotOwner(inputs.message);

    // Check the integrity of inputs.overrideChannel
    var overrideChannel;
    if (inputs.overrideChannel && inputs.overrideChannel !== "null") {
      overrideChannel = inputs.message.guild.channels.resolve(
        inputs.overrideChannel
      );
      if (!overrideChannel)
        throw new Error(
          "The provided overrideChannel does not exist. Please ensure you have the correct snowflake."
        );
    }

    // TODO: keep this up to date as you change channel properties in the Guilds model.
    var properties = [
      "incidentsCategory",
      "banLogChannel",
      "kickLogChannel",
      "modLogChannel",
      "publicModLogChannel",
      "joinLogChannel",
      "leaveLogChannel",
      "autoModLogChannel",
      "channelLogChannel",
      "messageLogChannel",
      "userLogChannel",
      "generalChannel",
      "announcementsChannel",
    ];

    properties.sort();
    var propertiesMain = _.cloneDeep(properties);

    // Now, break the properties up into groups of 10 for pagination.
    var _properties = [];
    var _properties2 = [];
    while (properties.length > 0) {
      _properties.push(properties.shift());
      if (_properties.length > 9) {
        _properties2.push(_.cloneDeep(_properties));
        _properties = [];
      }
    }
    if (_properties.length > 0) {
      _properties2.push(_.cloneDeep(_properties));
    }

    // Create the menu
    return new Discord.DiscordMenu(
      inputs.message.channel,
      inputs.message.author.id,
      _properties2.map((group) => {
        var groupEmbed = new Discord.MessageEmbed()
          .setAuthor(
            `${inputs.message.author.tag}`,
            `${inputs.message.author.displayAvatarURL()}`
          )
          .setTitle(`Channel - Settings list`)
          .setDescription(
            `Type in the name of the setting you want ${
              inputs.overrideChannel === "null"
                ? `to reset.`
                : `this channel to be set on.`
            } Use the reactions to scroll through the pages.`
          )
          .setColor(`#8800FF`)
          .setFooter(`User ID: ${inputs.message.author.id}`)
          .setTimestamp();
        group.map((property) => {
          if (sails.models.guilds.attributes[property]) {
            groupEmbed.addField(
              property,
              sails.models.guilds.attributes[property].description ||
                `Unknown description for this setting.`
            );
          }
        });
        return groupEmbed;
      }),
      // Actualizer for when someone types a setting
      propertiesMain.map((property) => {
        return {
          message: property,
          fn: (senderMessage) => {
            senderMessage.delete();
            var obj = {};
            obj[property] =
              inputs.overrideChannel === "null"
                ? null
                : inputs.overrideChannel || inputs.message.channel.id;
            sails.models.guilds
              .updateOne({ guildID: inputs.message.guild.id }, obj)
              .then(() => {
                const embed = new Discord.MessageEmbed()
                  .setAuthor(
                    `${inputs.message.author.tag}`,
                    `${inputs.message.author.displayAvatarURL()}`
                  )
                  .setTitle(
                    `Channel - Guild setting ${property} was ${
                      inputs.overrideChannel === "null" ? `reset` : `changed`
                    }!`
                  )
                  .setTimestamp()
                  .setFooter(`User ID: ${inputs.message.author.id}`)
                  .setColor(`#8800FF`);
                inputs.message.channel.send(embed);
              })
              .catch((err) => {
                throw new Error(err);
              });
          },
        };
      })
    );
  },
};
