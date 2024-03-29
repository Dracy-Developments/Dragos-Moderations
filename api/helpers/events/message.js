const fs = require("fs");
const path = require("path");

module.exports = {
  friendlyName: "events.message",

  description: "DiscordClient message event",

  inputs: {
    message: {
      type: "ref",
      required: true,
      description: "The message object",
    },
  },

  fn: async function (inputs) {
    // Ignore own message
    if (inputs.message.author && inputs.message.author.id === Client.user.id)
      return;

    // Reply to DMs saying bot ignores DM messages
    if (!inputs.message.guild && inputs.message.author) {
      inputs.message.author.send(
        `Oh hi there! Sorry but I don't really have anything to say in DMs. Please talk to me in a guild.`
      );
      return;
    }

    // If member is supposed to be muted, mute them and delete the message
    // TODO

    // Add spam score
    // TODO

    // COMMAND

    // Check for a command and execute it if found
    var guildSettings = await inputs.message.guild.settings();
    var prefix =
      guildSettings.prefix || sails.config.custom.discord.defaultPrefix;
    var command;
    var commandParts;

    // Is a command by a guild member who is not a bot? If so, execute it under sails.helpers.commands.
    if (inputs.message.content.startsWith(prefix)) {
      if (
        inputs.message.member &&
        inputs.message.author &&
        !inputs.message.author.bot
      ) {
        // Each command parameter should be separated by a " | " or a double/triple space in the message.
        // Note: We use double or triple space separation because a Discord mention auto-adds a space at the end, so it's possible the user will add 2 more spaces.
        commandParts = inputs.message.content
          .replace(prefix, "")
          .split(/(\s{2,3})|(\s\|\s)+/g);
        commandParts = commandParts.filter((part, index) => index % 3 === 0);
        command = commandParts[0];

        // Check if a command is disabled
        if (guildSettings.disabledCommands.indexOf(command) !== -1) {
          const disabledEmbed = new Discord.MessageEmbed()
            .setAuthor(
              `${inputs.message.author.tag}`,
              `${inputs.message.author.displayAvatarURL()}`
            )
            .setTitle(`❌ ${command} - Command Disabled.`)
            .setDescription(`That command has been disabled in this guild.`)
            .setColor(`#ee110f`)
            .setFooter(`User ID: ${inputs.message.author.id}`)
            .setThumbnail(
              `https://cdn.discordapp.com/emojis/604486986170105866.png?v=1`
            );
          inputs.message.channel
            .send(disabledEmbed)
            .then((a) => a.delete({ timeout: 15000 }));
        } else {
          sails.log.debug(
            `Discord: command executed: ${command}, by ${inputs.message.author.tag}`
          );

          if (
            typeof sails.helpers.commands !== "undefined" &&
            typeof sails.helpers.commands[command] !== "undefined"
          ) {
            commandParts[0] = inputs.message; // The first parameter passed is always the message itself, followed by the user's specified parameters
            try {
              await sails.helpers.commands[command](...commandParts);
            } catch (e) {
              await sails.log.error(e);

              // TODO: Send certain errors to the bot error channel
              // Return an error message
              const errorMessage = new Discord.MessageEmbed()
                .setAuthor(
                  `${inputs.message.author.tag}`,
                  `${inputs.message.author.displayAvatarURL()}`
                )
                .setTitle(`❌ ${command} - An error occurred.`)
                .setDescription(`${e.message}\n\u200b`)
                .setColor(`#ee110f`)
                .setFooter(`User ID: ${inputs.message.author.id}`)
                .setThumbnail(
                  `https://cdn.discordapp.com/emojis/604486986170105866.png?v=1`
                );
              if (typeof e.helperImage !== "undefined") {
                errorMessage.setImage(`${e.helperImage}`);
              }
              inputs.message.channel
                .send(errorMessage)
                .then((a) => a.delete({ timeout: 30000 }));
            }
          } else {
            // Invalid command
            await sails.log.warn(`Discord command ${command} does not exist.`);

            // Return an error message
            const errorMessage = new Discord.MessageEmbed()
              .setAuthor(
                `${inputs.message.author.tag}`,
                `${inputs.message.author.displayAvatarURL()}`
              )
              .setTitle(`❌ ${command} - Invalid Command`)
              .setDescription(
                `Remember that command parameters must be separated with " | " or double spaces`
              )
              .setColor(`#ee110f`)
              .setFooter(`User ID: ${inputs.message.author.id}`)
              .setThumbnail(
                `https://cdn.discordapp.com/emojis/604486986170105866.png?v=1`
              );
            inputs.message.channel
              .send(errorMessage)
              .then((a) => a.delete({ timeout: 15000 }));
          }
        }
      }
    } else {
      // Not a command
    }
  },
};
