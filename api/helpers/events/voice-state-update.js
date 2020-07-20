module.exports = {
  friendlyName: "events.voiceStateUpdate",

  description: "Discord voice state update event",

  inputs: {
    oldState: {
      type: "ref",
      required: true,
      description: "Old state of voice",
    },
    newState: {
      type: "ref",
      required: true,
      description: "New voice state",
    },
  },

  fn: async function (inputs) {
    // Fetch partials
    if (inputs.newState.member.partial) await inputs.newState.member.fetch();

    // Check if the member should be kicked from the voice channel
    if (
      inputs.newState.member &&
      inputs.newState.channel.id &&
      (inputs.oldState.member.partial ||
        inputs.oldState.channel.id !== inputs.newState.channel.id)
    ) {
      // Check if the member is muted. If so, kick them out of the voice channel.
      // TODO: Use muted helper when developed
      var memberSettings = await inputs.newState.member.settings();
      if (memberSettings.muted) {
        inputs.newState.kick(`User is muted`);
      }

      // Check if the member has a restriction on voice channel use. If so, kick them.
      var memberModeration = await inputs.newState.member.moderation();
      if (
        await sails.helpers.moderation.checkRestriction(
          memberModeration,
          "cannotUseVoiceChannels"
        )
      ) {
        inputs.newState.kick("Use is not allowed to use voice channels");

        // Add some spam score to prevent the potential of someone spamming the general channel by means of quickly and repeatedly trying to join a voice channel.
        // TODO
        // await sails.helpers.spam.add(inputs.newState.member, 25);
        
        var msg = await sails.helpers.guild.send(
          "generalChannel",
          inputs.newState.member.guild,
          `:lock: Sorry <@${inputs.newState.member.id}>. But you are not allowed to use the voice channels. Warning: Repeatedly trying to access the voice channels will trigger the antispam system.`
        );
        setTimeout(() => {
          msg.delete();
        }, 15000);
      }
    }
  },
};
