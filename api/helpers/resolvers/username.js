module.exports = {
  friendlyName: "resolvers.username",

  description:
    "Resolve a username to a Discord user, or prompt if multiple ones detected.",

  inputs: {
    message: {
      type: "ref",
      required: true,
    },
    username: {
      type: "string",
      required: true,
    },
  },

  fn: async function (inputs) {
    var regExpEsc = (str) => str.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");

    if (!inputs.message.guild)
      return sails.helpers.resolvers.user(inputs.username);
    const resUser = await resolveUser(inputs.username, inputs.message.guild);
    if (resUser) return resUser;

    const results = [];
    const reg = new RegExp(regExpEsc(inputs.username), "i");
    for (const member of inputs.message.guild.members.cache.values()) {
      if (reg.test(member.user.username)) {
        results.push(member.user);
      } else if (reg.test(member.nickname)) {
        results.push(member.user);
      }
    }

    let querySearch;
    if (results.length > 0) {
      const regWord = new RegExp(`\\b${regExpEsc(inputs.username)}\\b`, "i");
      const filtered = results.filter((user) => regWord.test(user.username));
      querySearch = filtered.length > 0 ? filtered : results;
    } else {
      querySearch = results;
    }

    switch (querySearch.length) {
      case 0:
        throw new Error(
          `Sorry, I could not find any users matching the criteria provided for ${inputs.username}. Please make sure you provided a valid username, nickname, mention, or id.`
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
            children.push(options);
            childrenMain.push(options);
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
                .setTitle(`Multiple users found!`)
                .setDescription(
                  `Multiple users matched the name **${possible.name}**. Use the menu to find which user you meant, and then type their name in a message.`
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

function resolveUser(query, guild) {
  if (query instanceof Discord.GuildMember) return query.user;
  if (query instanceof Discord.User) return query;
  if (typeof query === "string") {
    if (sails.config.custom.discord.regex.userOrMember.test(query))
      return guild.client.users
        .fetch(sails.config.custom.discord.regex.userOrMember.exec(query)[1])
        .catch(() => null);
    if (/\w{1,32}#\d{4}/.test(query)) {
      const res = guild.members.cache.find(
        (member) => member.user.tag === query
      );
      return res ? res.user : null;
    }
  }
  return null;
}
