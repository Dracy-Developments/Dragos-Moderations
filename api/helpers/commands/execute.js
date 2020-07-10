const exec = require("child_process").exec;
const hastebin = require("hastebin-gen");

module.exports = {
  friendlyName: "Execute",

  description: "Execute commands in the terminal.",

  inputs: {
    message: {
      type: "ref",
      required: true,
      description: "The message that triggered the command",
    },
    commands: {
      type: "string",
      required: true,
      description: "The shell/terminal line to run.",
    },
  },

  exits: {},

  fn: async function (inputs) {
    // Delete the original command message
    inputs.message.delete();

    // This command may only be used by the bot owner
    await sails.helpers.permissions.checkBotOwner(inputs.message);

    // Forbidden commands
    if (
      inputs.commands.toLowerCase().includes("/.|.&/") ||
      inputs.commands.toLowerCase().includes("mkdir") ||
      inputs.commands.toLowerCase().includes("restart") ||
      inputs.commands.toLowerCase().includes("reboot") ||
      inputs.commands.toLowerCase().includes("shutdown") ||
      inputs.commands.toLowerCase().includes("rm")
    ) {
      throw new Error(
        `mkdir, restart, reboot, shutdown, rm, and dot based directory structures are not permitted.`
      );
    }

    // Execute the command
    const excuted = exec(`${inputs.commands}`, (error, stdout) => {
      const response = error || stdout;
      if (response.length > 1024 || response.length > 1024) {
        hastebin(`${response}`, "js").then((r) => {
          const embed = new Discord.MessageEmbed()
            .setAuthor(
              `Drago's Moderation - Execute`,
              `${Client.user.displayAvatarURL()}`
            )
            .setDescription(`**Ran: ${inputs.commands}**\n\n[\`${r}\`](${r})`)
            .setThumbnail(Client.user.displayAvatarURL())
            .setFooter(
              `Execute was requested by ${inputs.message.author.username}`,
              `${inputs.message.author.displayAvatarURL({ dynamic: "true" })}`
            )
            .setColor(`#8800FF`);
          inputs.message.channel.send({
            embed,
          });
        });
      } else {
        const embed = new Discord.MessageEmbed()
          .setAuthor(
            `Drago's Moderation - Execute`,
            `${Client.user.displayAvatarURL()}`
          )
          .setDescription(
            `**Ran: ${inputs.commands}**\n\`\`\`js\n${response} \n\`\`\``,
            {
              code: "asciidoc",
              split: "\n",
            }
          )
          .setThumbnail(Client.user.displayAvatarURL())
          .setColor(0x36393e)
          .setFooter(
            `Execute was requested by ${inputs.message.author.username}`,
            `${inputs.message.author.displayAvatarURL({ dynamic: "true" })}`
          );
        inputs.message.channel.send({
          embed,
        });
      }
    });
  },
};
