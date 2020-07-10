var pjson = require("../../../package.json");
var changelogParser = require("changelog-parser");

module.exports = {
  friendlyName: "Changelog",
  description: "Display Any changes that were made on the bot",

  inputs: {
    message: {
      type: "ref",
      required: true,
      description: "The message that triggered the command",
    },
  },

  exits: {},

  fn: async function (inputs) {
    // Delete original message
    inputs.message.delete();

    changelogParser("CHANGELOG.md")
      .then(async (result) => {
        if (
          result.versions &&
          result.versions[0] &&
          result.versions[0].parsed
        ) {
          // Construct embed
          var changelog = new Discord.MessageEmbed()
            .setAuthor(
              `Current Version - ${pjson.version}`,
              `${Client.user.displayAvatarURL()}`
            )
            .setColor(`#8800FF`)
            .setFooter(
              `Changelog was requested by ${inputs.message.author.username}`,
              `${inputs.message.author.displayAvatarURL({ dynamic: "true" })}`
            )
            .setTimestamp();

          // Only get the most recent changes on the changelog
          var version = result.versions[0];
          changelog.setDescription(`The following changelog is for version ${version.title}`);
          for (var key in version.parsed) {
            if (
              Object.prototype.hasOwnProperty.call(version.parsed, key) &&
              key !== "_"
            ) {
              changelog.addField(
                key,
                version.parsed[key].map((data) => `* ${data}`).join(`
              `)
              );
            }
          }

          // Send embed
          inputs.message.channel.send(changelog);
        } else {
          throw new Error(
            `The changelog is not formatted properly; header 2s must begin with the version number and must contain proper Added/Changed/Deprecated/Removed header 3s with lists.`
          );
        }
      })
      .catch(function (err) {
        // Whoops, something went wrong!
        throw err;
      });
  },
};
