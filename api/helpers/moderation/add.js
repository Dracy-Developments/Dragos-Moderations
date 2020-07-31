// DEPRECATED!!!

module.exports = {
  friendlyName: "discipline.add",

  description:
    "Execute a disciplinary action against a member. You should create an incidents channel first and pass as parameter.",

  inputs: {
    channel: {
      type: "ref",
      required: true,
      description:
        "The incidents channel for this discipline. The uid will be derived from its name.",
    },
    user: {
      type: "ref",
      required: true,
      description:
        "The user being disciplined (not guild member; that way, we can discipline members not in the guild).",
    },
    guild: {
      type: "ref",
      required: true,
      description: "The guild to discipline the user in.",
    },
    issuer: {
      type: "ref",
      required: true,
      description: "The user issuing the action.",
    },

    // Discipline-specific inputs
    type: {
      type: "string",
      isIn: [
        "note",
        "warning",
        "discipline",
        "antispam",
        "reflection",
        "restrictions",
        "kick",
        "ban",
        "discord-ban",
        "investigation",
      ],
      required: true,
      description: "The type of discipline this is",
    },
    rules: {
      type: "json",
      required: true,
      description:
        "Array of rule numbers violated that corresponds to the rules set for the guild in the Rules model.",
    },
    reason: {
      type: "string",
      defaultsTo: "No reason specified; please contact the staff.",
      maxLength: 1024,
      description:
        "Concise description of what the user did to warrant this action. Also include links to immediate evidence.",
    },
    additionalInformation: {
      type: "string",
      maxLength: 1024,
      allowNull: true,
      description: "Any additional information or discipline issued.",
    },

    // Basic discipline
    XP: {
      type: "number",
      min: 0,
      defaultsTo: 0,
      description: "Amount of XP to take away",
    },
    coins: {
      type: "number",
      min: 0,
      defaultsTo: 0,
      description: "Number of coins to fine from the member.",
    },
    vpts: {
      type: "number",
      min: 0,
      defaultsTo: 0,
      description: "Number of violation points to assign to this discipline.",
    },

    // Reflection / Research
    apologies: {
      type: "json",
      description:
        "Array of string descriptors (such as usernames) of the people this member is required to write an apology to.",
    },
    research: {
      type: "json",
      description:
        "Array of research paper topics this member must write about.",
    },
    retractions: {
      type: "json",
      description: "Array of retraction statements this member must write.",
    },
    quizzes: {
      type: "json",
      description: "Array of quizzes this member must take.",
    },

    // Access restrictions
    muteDuration: {
      type: "number",
      allowNull: true,
      description:
        "If this member is to be muted, the duration of the mute in minutes. Use 0 for indefinite.",
    },
    channelRestrictions: {
      type: "json",
      description: "Array of channel IDs the member to lose privileges to use.",
    },
    rolesAdded: {
      type: "json",
      description: "Array of role IDs to add to this member.",
    },
    rolesRemoved: {
      type: "json",
      description: "Array of role IDs to remove from this member.",
    },
    cannotUseVoiceChannels: {
      type: "boolean",
      defaultsTo: false,
      description:
        "True if this discipline should prohibit the member from using any voice channels.",
    },
    cannotGiveReputation: {
      type: "boolean",
      defaultsTo: false,
      description:
        "True if this discipline should prohibit the member from giving any reputation to other members.",
    },
    cannotUseStaffCommand: {
      type: "boolean",
      defaultsTo: false,
      description:
        "True if this discipline should prohibit the member from using the staff command.",
    },
    cannotUseReportCommand: {
      type: "boolean",
      defaultsTo: false,
      description:
        "True if this discipline should prohibit the member from using the report command.",
    },
    cannotUseSupportCommand: {
      type: "boolean",
      defaultsTo: false,
      description:
        "True if this discipline should prohibit the member from using the support command.",
    },
    cannotUseConflictCommand: {
      type: "boolean",
      defaultsTo: false,
      description:
        "True if this discipline should prohibit the member from using the conflict command.",
    },
    cannotPurchaseAds: {
      type: "boolean",
      defaultsTo: false,
      description:
        "True if this discipline should prohibit the member from purchasing ads.",
    },
    cannotEditProfile: {
      type: "boolean",
      defaultsTo: false,
      description:
        "True if this discipline should prohibit the member from editing their profile.",
    },

    // Bans
    banDuration: {
      type: "number",
      allowNull: true,
      description:
        "If this member is to be banned, the amount of time the ban should last, in days. Use 0 for permanent.",
    },
  },

  fn: async function (inputs) {
    // TODO: Add functionality for "notes"

    // Get the case uid from the created channel
    var uid = inputs.channel.name.split("-");
    if (!uid[1]) {
      uid = await sails.helpers.uid();
    } else {
      uid = uid[1];
    }

    // Get user settings
    var guildMemberSettings = await inputs.user.guildSettings(inputs.guild.id);

    // get the guild member object of the user
    var guildMember = await inputs.guild.members.resolve(inputs.user);

    // Init the info for the public mod channel
    var publicString = ``;

    // Init the message
    var msg = new Discord.MessageEmbed()
      .setAuthor(
        `Issued by: ${inputs.issuer.tag}`,
        `${inputs.issuer.displayAvatarUrl()}`
      )
      .setColor(colour(inputs.type))
      .setTimestamp()
      .setURL(
        `${sails.config.custom.baseURL}/guild/${inputs.guild.id}/user/${inputs.user.id}/moderation/${uid}`
      );

    // Init the log
    var modRecord = await sails.models.moderation
      .create({
        case: uid,
        userID: inputs.user.id,
        guildID: inputs.guild.id,
        type: inputs.type,
        issuer: inputs.issuer.id,
        appealed: false,
        rules: inputs.rules,
        reason: inputs.reason,
        XP: inputs.XP,
        coins: inputs.coins,
        vpts: inputs.vpts,
        channelRestrictions: inputs.channelRestrictions,
        rolesAdded: inputs.rolesAdded,
        rolesRemoved: inputs.rolesRemoved,
        cannotUseVoiceChannels: inputs.cannotUseVoiceChannels,
        cannotGiveReputation: inputs.cannotGiveReputation,
        cannotUseStaffCommand: inputs.cannotUseStaffCommand,
        cannotUseReportCommand: inputs.cannotUseReportCommand,
        cannotUseSupportCommand: inputs.cannotUseSupportCommand,
        cannotUseConflictCommand: inputs.cannotUseConflictCommand,
        cannotPurchaseAds: inputs.cannotPurchaseAds,
        cannotEditProfile: inputs.cannotEditProfile,
        apologies: inputs.apologies,
        research: inputs.research,
        retractions: inputs.retractions,
        quizzes: inputs.quizzes,
        muteDuration: inputs.muteDuration,
        banDuration: inputs.banDuration,
        additionalInformation: inputs.additionalInformation,
      })
      .fetch();

    // Set up a function called for reflection (class D) discipline and higher
    var classD = () => {
      // Check to ensure at least one reflection (class D) discipline was specified
      if (
        inputs.apologies ||
        inputs.research ||
        inputs.retraction ||
        inputs.quizzes
      ) {
        // Format the mute depending on whether or not a temp ban is issued
        if (inputs.banDuration === null) {
          inputs.muteDuration = 0;
          msg.addField(
            `:clipboard: **You are required to complete tasks**`,
            `This discipline includes one or more required tasks for you to complete. Please note the following:` +
              "\n" +
              `---You are muted in the guild until all tasks have been completed / satisfied.` +
              "\n" +
              `---You may be kicked from the guild if you go several days without completing your tasks, at staff discretion.`
          );
        } else {
          msg.addField(
            `:clipboard: **You are required to complete tasks when you return to the guild**`,
            `This discipline includes one or more required tasks for you to complete once you return to the guild from your temporary ban. Please note the following:` +
              "\n" +
              `---You are muted in the guild. Once you return after your temporary ban, you will remain muted until all tasks are completed / satisfied.` +
              "\n" +
              `---You may be kicked from the guild if you go several days without completing your tasks, at staff discretion.`
          );
        }
        // No reflection (class D) discipline, but a mute was specified? Make a mute discipline message based on duration.
      } else if (inputs.muteDuration !== null) {
        msg.addField(
          `:mute: **You have been muted until ${
            inputs.muteDuration === 0
              ? `staff unmute you`
              : `${moment()
                  .add(inputs.muteDuration, "minutes")
                  .format("LLLL Z")}`
          }**`,
          `You are muted and have restricted access to the guild until your mute expires or is removed.`
        );
      }

      // Make messages depending on reflection (class D) discipline specified.
      if (inputs.apologies) {
        msg.addField(
          `:sweat_smile: **You need to apologize to one or more members**`,
          inputs.apologies.map((record) => `◾${record}`).join("\n")
        );
        msg.addField(
          `Apology requirements (each)`,
          `---Must acknowledge you did wrong, state what you did wrong, mention how your behavior impacted the members/community, what you learned, and what you will do to ensure this does not happen again.` +
            "\n" +
            `---May not contain excuses, justifications, nor defensive language.` +
            "\n" +
            `---Please post completed apologies in this channel as a message, an attachment, or link to an online document.`
        );
      }

      if (inputs.research) {
        msg.addField(
          `:pencil: **You must write one or more research papers**`,
          inputs.research.map((record) => `◾${record}`).join("\n")
        );
        msg.addField(
          `Research Paper requirements (each)`,
          `---Must contain an introduction / thesis, body (supporting details, facts, and evidence), and conclusion (what you learned and how you will apply this knowledge).` +
            "\n" +
            `---Must contain cited credible sources (ask staff for help on what is deemed credible and how many sources you are required to have).` +
            "\n" +
            `---Please post completed research papers in this channel as a message, an attachment, or link to an online document.`
        );
      }

      if (inputs.retraction) {
        msg.addField(
          `:page_facing_up: **You must write one or more retraction statements**`,
          inputs.retraction.map((record) => `◾${record}`).join("\n")
        );
        msg.addField(
          `Retraction Statement requirements (each)`,
          `---Must contain an introduction (what you originally said, and acknowledgment that it was wrong / inaccurate), body (the correct facts and evidence / citations to support that), and conclusion (what you learned and how you will apply this knowledge).` +
            "\n" +
            `---Must contain cited credible sources (ask staff for help on what is deemed credible and how many you are required to have).` +
            "\n" +
            `---Please post completed apologies in this channel as a message, an attachment, or link to an online document.`
        );
      }

      if (inputs.quizzes) {
        msg.addField(
          `:question: **You must take and pass one or more quizzes**`,
          inputs.quizzes.map((record) => `◾${record}`).join("\n")
        );
      }
    };

    // Update the incidents channel with relevant information
    switch (inputs.type) {
      case "warning":
        inputs.muteDuration = null;
        inputs.banDuration = null;
        msg.setTitle(
          `:warning: **__YOU HAVE BEEN FORMALLY WARNED__** :warning:`
        );
        msg.setThumbnail(
          `${sails.config.custom.baseURL}/assets/images/discipline/warning.png`
        );
        msg.setDescription(
          `We are concerned about your recent conduct. Please read this information carefully. Future incidents can result in discipline. You may ask staff any questions you have, or to help you develop a plan to avoid these incidents in the future, in this channel.` +
            "\n\n" +
            `:hash: You are in violation of rule number(s) ${inputs.rules.join(
              ", "
            )}` +
            "\n" +
            `${inputs.reason}`
        );
        msg.setFooter(
          `🔒 This channel is private between you and staff to discuss this matter. Please remain respectful.` +
            "\n" +
            `😊 Thank you for your understanding and cooperation.` +
            "\n\n" +
            `#️⃣ Case ID: ${uid}`
        );
        publicString = `:warning: <@${inputs.user.id}> (${
          inputs.user.tag
        }) was warned by <@${
          inputs.issuer.id
        }> for violating rule number(s) ${inputs.rules.join(", ")}.`;
        break;
      case "discipline":
        inputs.muteDuration = null;
        inputs.banDuration = null;
        msg.setTitle(
          `:octagonal_sign: **__YOU HAVE BEEN DISCIPLINED__** :octagonal_sign:`
        );
        msg.setThumbnail(
          `${sails.config.custom.baseURL}/assets/images/discipline/discipline.png`
        );
        msg.setDescription(
          `You have recently violated our rules and have been issued basic discipline. Please read the following information carefully. You may ask questions or request help to develop an a plan in this channel.` +
            "\n\n" +
            `:hash: You are in violation of rule number(s) ${inputs.rules.join(
              ", "
            )}` +
            "\n" +
            `${inputs.reason}`
        );
        msg.setFooter(
          `🔒 This channel is private between you and staff to discuss this matter. Please remain respectful.` +
            "\n" +
            `😊 Thank you for your understanding and cooperation.` +
            "\n\n" +
            `#️⃣ Case ID: ${uid}`
        );
        publicString = `:octagonal_sign: <@${inputs.user.id}> (${
          inputs.user.tag
        }) was issued discipline by <@${
          inputs.issuer.id
        }> for violating rule number(s) ${inputs.rules.join(", ")}.`;
        break;
      case "antispam":
        msg.setTitle(`:mute: **__YOU HAVE BEEN MUTED FOR SPAM__** :mute:`);
        msg.setThumbnail(
          `${sails.config.custom.baseURL}/assets/images/discipline/mute.png`
        );
        msg.setDescription(
          `You have been muted by the automatic antispam system. Please read the following information carefully.` +
            "\n\n" +
            `:hash: You are in violation of rule number(s) ${inputs.rules.join(
              ", "
            )}` +
            "\n" +
            `${inputs.reason}`
        );
        msg.setFooter(
          `🔒 This channel is private between you and staff to discuss this matter. Please remain respectful.` +
            "\n" +
            `😊 Thank you for your understanding and cooperation.` +
            "\n\n" +
            `#️⃣ Case ID: ${uid}`
        );
        publicString = `:mute: <@${inputs.user.id}> (${inputs.user.tag}) was muted by the bot for triggering the antispam.`;
        break;
      case "reflection":
        inputs.muteDuration = 0;
        inputs.banDuration = null;
        msg.setTitle(
          `:notebook: **__YOU ARE REQUIRED TO COMPLETE TASKS__** :notebook:`
        );
        msg.setThumbnail(
          `${sails.config.custom.baseURL}/assets/images/discipline/assignment.png`
        );
        msg.setDescription(
          `You have recently violated our rules. We need you to complete one or more tasks to be allowed full access again in the guild. Please read the following information carefully. You may ask questions or request help in this channel.` +
            "\n\n" +
            `:hash: You are in violation of rule number(s) ${inputs.rules.join(
              ", "
            )}` +
            "\n" +
            `${inputs.reason}`
        );
        msg.setFooter(
          `🔒 This channel is private between you and staff to discuss this matter. Please remain respectful.` +
            "\n" +
            `😊 Thank you for your understanding and cooperation.` +
            "\n\n" +
            `#️⃣ Case ID: ${uid}`
        );
        publicString = `:octagonal_sign: <@${inputs.user.id}> (${
          inputs.user.tag
        }) was issued discipline by <@${
          inputs.issuer.id
        }> for violating rule number(s) ${inputs.rules.join(", ")}.`;
        break;
      case "restrictions":
        inputs.banDuration = null;
        msg.setTitle(
          `:closed_lock_with_key: **__RESTRICTIONS HAVE BEEN PLACED ON YOU__** :closed_lock_with_key:`
        );
        msg.setThumbnail(
          `${sails.config.custom.baseURL}/assets/images/discipline/restrictions.png`
        );
        msg.setDescription(
          `You have recently violated our rules. To protect the safety of our community, restrictions have been placed on you. Please read the following information carefully. You may ask questions or request help in this channel.` +
            "\n\n" +
            `:hash: You are in violation of rule number(s) ${inputs.rules.join(
              ", "
            )}` +
            "\n" +
            `${inputs.reason}`
        );
        msg.setFooter(
          `🔒 This channel is private between you and staff to discuss this matter. Please remain respectful.` +
            "\n" +
            `😊 Thank you for your understanding and cooperation.` +
            "\n\n" +
            `#️⃣ Case ID: ${uid}`
        );
        publicString = `:octagonal_sign: <@${inputs.user.id}> (${
          inputs.user.tag
        }) was issued discipline by <@${
          inputs.issuer.id
        }> for violating rule number(s) ${inputs.rules.join(", ")}.`;
        break;
      case "kick":
        publicString = `:athletic_shoe: <@${inputs.user.id}> (${inputs.user.tag}) was kicked by <@${inputs.issuer.id}> .`;
        break;
      case "ban":
        inputs.muteDuration = null;
        if (!inputs.banDuration) {
          msg.setTitle(
            `:no_entry_sign: **__YOU HAVE BEEN BANNED INDEFINITELY__** :no_entry_sign:`
          );
          msg.setThumbnail(
            `${sails.config.custom.baseURL}/assets/images/discipline/ban.png`
          );
          msg.setDescription(
            `Your behavior cannot be tolerated in our guild. An indefinite ban has been issued against you. We hope you enjoyed your stay and wish you the best in your future endevors. Please read the following information carefully. You may ask questions in this channel.` +
              "\n\n" +
              `:hash: You are in violation of rule number(s) ${inputs.rules.join(
                ", "
              )}` +
              "\n" +
              `${inputs.reason}`
          );
          msg.setFooter(
            `🔒 This channel is private between you and staff to discuss this matter. Please remain respectful.` +
              "\n" +
              `😊 Thank you for your understanding and cooperation.` +
              "\n\n" +
              `#️⃣ Case ID: ${uid}`
          );
          publicString = `:no_entry_sign: <@${inputs.user.id}> (${
            inputs.user.tag
          }) was banned indefinitely by <@${
            inputs.issuer.id
          }> for violating rule number(s) ${inputs.rules.join(", ")}.`;
        } else {
          msg.setTitle(
            `:no_entry: **__YOU HAVE BEEN BANNED TEMPORARILY__** :no_entry:`
          );
          msg.setThumbnail(
            `${sails.config.custom.baseURL}/assets/images/discipline/tempban.png`
          );
          msg.setDescription(
            `Your conduct has caused significant problems in the community. You are required to leave for a temporary time to reflect on, and improve, your behavior. Please read the following information carefully. You may ask questions or request help to develop an action plan in this channel.` +
              "\n\n" +
              `:hash: You are in violation of rule number(s) ${inputs.rules.join(
                ", "
              )}` +
              "\n" +
              `${inputs.reason}`
          );
          msg.setFooter(
            `🔒 This channel is private between you and staff to discuss this matter. Please remain respectful.` +
              "\n" +
              `😊 Thank you for your understanding and cooperation.` +
              "\n\n" +
              `#️⃣ Case ID: ${uid}`
          );
          publicString = `:no_entry: <@${inputs.user.id}> (${
            inputs.user.tag
          }) was temporarily banned by <@${
            inputs.issuer.id
          }> for violating rule number(s) ${inputs.rules.join(", ")}.`;
        }
        break;
      case "discord-ban":
        publicString = `:no_entry_sign: <@${inputs.user.id}> (${inputs.user.tag}) was banned indefinitely by <@${inputs.issuer.id}> .`;
        break;
      case "investigation":
        inputs.muteDuration = 0;
        inputs.banDuration = null;
        msg.setTitle(
          `:mag: **__YOU HAVE BEEN MUTED FOR FURTHER INVESTIGATION__** :mag:`
        );
        msg.setThumbnail(
          `${sails.config.custom.baseURL}/assets/images/discipline/ban.png`
        );
        msg.setDescription(
          `You have recently violated the law or Discord's Terms of Service. You have been muted while we file a report and an investigation is conducted. Please read the following information carefully.` +
            "\n\n" +
            `:hash: You are in violation of rule number(s) ${inputs.rules.join(
              ", "
            )}` +
            "\n" +
            `${inputs.reason}`
        );
        msg.setFooter(
          `🔒 This channel is private between you and staff to discuss this matter. Please remain respectful.` +
            "\n" +
            `😊 Thank you for your understanding and cooperation.` +
            "\n" +
            `👮 STAFF: while this member is under investigation, do NOT delete relevant messages. Furthermore, if you issue a ban, choose the "Don't Delete Any" option for delete message history. Discord requires that the original messages remain present until they finish investigating.` +
            "\n\n" +
            `#️⃣ Case ID: ${uid}`
        );
        publicString = `:no_entry: <@${inputs.user.id}> (${
          inputs.user.tag
        }) is being investigated by <@${
          inputs.issuer.id
        }> for possible illegal activity via violating rule number(s) ${inputs.rules.join(
          ", "
        )}.`;
    }

    // Bans
    if (inputs.banDuration !== null) {
      if (inputs.banDuration === 0) {
        msg.addField(
          `:no_entry_sign: **You have been indefinitely banned**`,
          `You are asked to leave the guild immediately. We hope you enjoyed your stay and wish you luck in your journey.` +
            "\n" +
            `Once you leave the guild, a ban will be placed on you. This ban will remain in place indefinitely or until staff manually remove it. Until you leave or staff kick you, you will remain muted.`
        );
      } else {
        msg.addField(
          `:no_entry: **You have been temporarily banned for ${inputs.banDuration} days**`,
          `You are required to leave the guild and reflect on, and improve, your behavior.` +
            "\n" +
            `Once you leave the guild, a ban will be placed on you, which will be removed by the bot in ${inputs.banDuration} days. Your temp-ban time will not begin until you leave the guild or get kicked; until then, you will remain muted.`
        );
      }
    }

    // Add a schedule if a mute is in place
    if (
      inputs.muteDuration !== null &&
      inputs.muteDuration > 0 &&
      (!inputs.banDuration || !guildMember)
    ) {
      // TODO: add removeMute task
      await sails.models.schedules
        .create({
          uid: `d-${uid}`,
          task: "removeMute",
          data: {
            user: inputs.user.id,
            guild: inputs.guild.id,
          },
          nextRun: moment()
            .add(inputs.muteDuration, "minutes")
            .toISOString(true),
        })
        .fetch();
      await sails.models.moderation.updateOne(
        { id: modRecord.id },
        { schedule: `d-${uid}` }
      );
    }

    // Channel restrictions
    if (inputs.channelRestrictions && inputs.channelRestrictions.length > 0) {
      var channelNames = [];
      inputs.channelRestrictions.map((channel) => {
        var theChannel = inputs.guild.channels.resolve(channel);

        if (theChannel) {
          channelNames.push(
            `${theChannel.parent ? `${theChannel.parent.name} -> ` : ``}${
              theChannel.name
            }`
          );
          theChannel.createOverwrite(
            inputs.user,
            {
              VIEW_CHANNEL: false,
            },
            `Discipline case ${uid}`
          );
        }
      });
      msg.addField(
        `:lock_with_ink_pen: **You can no longer access these channels**`,
        `\`\`\`${channelNames.join("\n")}\`\`\``
      );
    }

    // Roles
    if (inputs.rolesAdded && inputs.rolesAdded.length > 0) {
      var roleNames = [];
      var maps = inputs.rolesAdded.map(async (permission, index) => {
        var theRole = inputs.guild.roles.resolve(permission);

        if (theRole) {
          roleNames.push(theRole.name);
          if (guildMember) {
            guildMember.roles.add(theRole, `Discipline case ${uid}`);
          } else {
            var roles = guildMemberSettings.roles;
            roles.push(theRole.id);
            await sails.helpers.members.updateOne(
              { guildID: inputs.guild.id, userID: inputs.user.id },
              { roles: roles }
            );
          }
        }
      });
      await Promise.all(maps);

      msg.addField(
        `:closed_lock_with_key: **Roles were added**`,
        `These roles have been added to you: ${roleNames.join(", ")}`
      );
    }

    if (inputs.rolesRemoved && inputs.rolesRemoved.length > 0) {
      var roleNames = [];
      var maps = inputs.rolesRemoved.map(async (permission, index) => {
        var theRole = inputs.guild.roles.resolve(permission);

        if (theRole) {
          roleNames.push(theRole.name);
          if (guildMember) {
            guildMember.roles.remove(theRole, `Discipline case ${uid}`);
          } else {
            var roles = guildMemberSettings.roles.filter(
              (role) => role.id !== theRole.id
            );
            await sails.helpers.members.updateOne(
              { guildID: inputs.guild.id, userID: inputs.user.id },
              { roles: roles }
            );
          }
        }
      });
      await Promise.all(maps);

      msg.addField(
        `:closed_lock_with_key: **Roles were removed**`,
        `These roles have been removed from you: ${roleNames.join(", ")}`
      );
    }

    // Add bot restrictions
    if (inputs.cannotUseVoiceChannels && guildMember) {
      guildMember.voice.setDeaf(
        true,
        "User disciplined with cannotUseVoiceChannels restriction."
      );
      guildMember.voice.setMute(
        true,
        "User disciplined with cannotUseVoiceChannels restriction."
      );
    }
    if (inputs.cannotUseVoiceChannels) {
      msg.addField(
        `:lock: **Cannot use the voice channels anymore**`,
        `Your access to all voice channels has been revoked indefinitely.`
      );
    }
    if (inputs.cannotGiveReputation) {
      msg.addField(
        `:lock: **Cannot give reputation anymore**`,
        `You are no longer able to give members reputation via the reputation command nor the reaction.`
      );
    }
    if (inputs.cannotUseStaffCommand) {
      msg.addField(
        `:lock: **Cannot use the staff command anymore**`,
        `You can no longer use the staff command to create channels with staff. If you need staff for any reason, you must send a DM.`
      );
    }
    if (inputs.cannotUseReportCommand) {
      msg.addField(
        `:lock: **Cannot use the report command anymore**`,
        `You can no longer use the report command to self-moderate troublesome members. But you can still notify staff of problematic members.`
      );
    }
    if (inputs.cannotUseSupportCommand) {
      msg.addField(
        `:lock: **Cannot use the support command anymore**`,
        `You can no longer use the support command to create opt-in channels to discuss sensitive support topics. If you need support, you can DM a member with their permission.`
      );
    }
    if (inputs.cannotUseConflictCommand) {
      msg.addField(
        `:lock: **Cannot use the conflict command anymore**`,
        `You can no longer use the conflict command. If a fight is occurring in the guild, you can still notify staff about it.`
      );
    }
    if (inputs.cannotPurchaseAds) {
      msg.addField(
        `:lock: **Cannot purchase ads anymore**`,
        `You are no longer allowed to advertise in this guild, even with the ad command.`
      );
    }
    if (inputs.cannotEditProfile) {
      msg.addField(
        `:lock: **Cannot edit profile anymore**`,
        `You are no longer allowed to edit your profile. Please contact staff if you have something important that needs changed on your profile.`
      );
    }

    // Check reflection (class D) discipline
    classD();

    // remove XP
    if (inputs.XP > 0) {
      msg.addField(
        `:fleur_de_lis: **${inputs.XP} XP has been retracted from you**`,
        `You now have ${guildMemberSettings.XP - inputs.XP} XP.`
      );
      await sails.models.members.updateOne(
        { guildID: inputs.guild.id, userID: inputs.user.id },
        { XP: guildMemberSettings.XP - inputs.XP }
      );

      // TODO
      // if (guildMember) await sails.helpers.xp.checkRoles(guildMember);
    }

    // remove coins
    if (inputs.coins > 0) {
      msg.addField(
        `:gem: **You were fined $${inputs.coins} coins**`,
        `You now have $${guildMemberSettings.coins - inputs.coins} coins.`
      );
      await sails.models.members.updateOne(
        { guildID: inputs.guild.id, userID: inputs.user.id },
        { coins: guildMemberSettings.coins - inputs.coins }
      );
    }

    // Violation Points
    if (inputs.vpts > 0) {
      // TODO: VPT decay
      msg.addField(
        `:broken_heart: **${inputs.vpts} Violation Points were added**`,
        `You now have ${
          guildMemberSettings.vpts - inputs.vpts
        } violation points.` +
          "\n" +
          `Staff may decide to issue more severe discipline when you have more violation points on your account.`
      );
    }

    // Additional info
    if (inputs.additionalInformation) {
      msg.addField(
        `:notepad_spiral: **Additional information / discipline**`,
        inputs.additionalInformation
      );
    }

    // If the member is no longer in the guild, issue the ban or tempban immediately, and undo the mute
    if (!guildMember) {
      if (inputs.banDuration !== null && inputs.type !== "discord-ban") {
        // Apply the ban
        await inputs.guild.members.ban(inputs.user, {
          days: inputs.type === "investigation" ? 0 : 7,
          reason: inputs.reason,
        });
        if (
          (!inputs.apologies &&
            !inputs.research &&
            !inputs.retraction &&
            !inputs.quizzes) ||
          inputs.banDuration === 0
        ) {
          await sails.helpers.members.updateOne(
            { guildID: inputs.guild.id, userID: inputs.user.id },
            { muted: false }
          );
        }

        // Add a schedule if the ban is limited duration
        // TODO: add removeBan task
        if (inputs.banDuration > 0) {
          await sails.models.schedules.create({
            uid: `d-${uid}`,
            task: "removeBan",
            data: {
              user: inputs.user.id,
              guild: inputs.guild.id,
            },
            nextRun: moment().add(inputs.banDuration, "days").toISOString(true),
          });
          await sails.helpers.members.updateOne(
            { guildID: inputs.guild.id, userID: inputs.user.id },
            { schedule: `d-${uid}` }
          );
        }
      }
    }

    // TODO: Add raid score
    /*
    switch (inputs.type) {
      case "Warning":
      case "Basic Discipline":
        await sails.helpers.guild.addRaidScore(inputs.guild, 10);
        break;
      case "Antispam Discipline":
        await sails.helpers.guild.addRaidScore(inputs.guild, 20);
        // TODO: Add slow decay score
        break;
      case "Reflection / Research":
      case "Access Restrictions":
        await sails.helpers.guild.addRaidScore(inputs.guild, 20);
        break;
      case "Ban":
      case "Investigation":
        await sails.helpers.guild.addRaidScore(inputs.guild, 30);
        break;
      default:
        await sails.helpers.guild.addRaidScore(inputs.guild, 10);
        break;
    }
    */

    // Post in the incidents channel
    inputs.channel.send(
      `<@${inputs.user.id}>, you have been issued a disciplinary notice. It is posted as an embed below.
        If you cannot see the information below, please go in your Discord settings -> App Settings -> Text & Images, and enable the __Show website preview info from links pasted into chat__ option.`,
      {
        split: true,
        embed: msg,
      }
    );

    // Post in the mod log channel
    await sails.helpers.guild.send(
      "modLogChannel",
      inputs.guild,
      `:warning: Discipline was issued against ${inputs.user.tag} (${inputs.user.id}). Below is an embed of their disciplinary message.`,
      { embed: msg }
    );

    // Post in the public channel
    await sails.helpers.guild.send(
      "publicModLogChannel",
      inputs.guild,
      publicString
    );
  },
};

function colour(type) {
  switch (type) {
    case "kick":
      return "#6c757d";
    case "ban":
    case "discord-ban":
      return "#dc3545";
    case "antispam":
      return "#17a2b8";
    case "warning":
      return "#ffc107";
    case "restrictions":
      return "#ff851b";
    case "reflection":
      return "#605ca8";
    case "discipline":
      return "#007bff";
    case "investigation":
      return "#f012be";
    default:
      return "#ffffff";
  }
}
