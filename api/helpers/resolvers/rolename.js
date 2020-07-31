module.exports = {
  friendlyName: "resolvers.rolename",

  description:
    "Resolve a role name to a Discord role, or prompt if multiple roles match criteria.",

  inputs: {
    message: {
      type: "ref",
      required: true,
    },
    roleName: {
      type: "string",
      required: true,
    },
  },

  fn: async function (inputs) {
    var regExpEsc = (str) => str.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");

    if (!inputs.message.guild)
      throw new Error(
        `Invalid: rolename arguments cannot be used outside of a guild.`
      );
    const resRole = resolveRole(inputs.roleName, inputs.message.guild);
    if (resRole) return resRole;

    const results = [];
    const reg = new RegExp(regExpEsc(inputs.roleName), "i");
    for (const role of inputs.message.guild.roles.cache.values()) {
      if (reg.test(role.name)) results.push(role);
    }

    let querySearch;
    if (results.length > 0) {
      const regWord = new RegExp(`\\b${regExpEsc(inputs.roleName)}\\b`, "i");
      const filtered = results.filter((role) => regWord.test(role.name));
      querySearch = filtered.length > 0 ? filtered : results;
    } else {
      querySearch = results;
    }

    switch (querySearch.length) {
      case 0:
        throw new Error(
          `Sorry, I could not find any roles that matched ${possible.name}.`
        );
      case 1:
        return querySearch[0];
      default:
        return await new Promise(async (resolve, reject) => {
          var children = [];
          var _children = [];
          var children2 = [];
          var childrenMain = [];
          querySearch.forEach((option) => {
            children.push(option);
            childrenMain.push(option);
          });

          // Now, break the roles up into groups of 10 for pagination.
          while (children.length > 0) {
            _children.push(children.shift());
            if (_children.length > 9) {
              children2.push(_.cloneDeep(_children));
              _children = [];
            }
          }
          if (_children.length > 0) {
            children2.push(_.cloneDeep(_children));
          }

          const menu = new Discord.DiscordMenu(
            inputs.message.channel,
            inputs.message.author.id,
            children2.map((group) => {
              var groupEmbed = new Discord.MessageEmbed()
                .setAuthor(
                  `${inputs.message.author.tag}`,
                  `${inputs.message.author.displayAvatarURL()}`
                )
                .setTitle(`Multiple roles found!`)
                .setDescription(
                  `Multiple roles matched the name **${possible.name}**. Use the menu to find which role you meant, and then type its name in a message.`
                )
                .setColor(`#8800FF`)
                .setFooter(`User ID: ${inputs.message.author.id}`)
                .setTimestamp();
              group.map((child) => {
                groupEmbed.addField(child.name, `ID: ${child.id}`);
              });
              return groupEmbed;
            }),
            childrenMain.map((child) => {
              return {
                message: child.name,
                fn: (senderMessage) => {
                  senderMessage.delete();
                  return resolve(child);
                },
              };
            })
          );
        });
    }
  },
};

function resolveRole(query, guild) {
  if (query instanceof Discord.Role)
    return guild.roles.has(query.id) ? query : null;
  if (
    typeof query === "string" &&
    sails.config.custom.discord.regex.role.test(query)
  )
    return guild.roles.resolve(
      sails.config.custom.discord.regex.role.exec(query)[1]
    );
  return null;
}
