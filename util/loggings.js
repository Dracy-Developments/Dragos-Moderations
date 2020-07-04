const {MessageEmbed} = require(`discord.js`);

function banLog(client, member, guild, reason, reporter) {
    const json = require(`./../data/guild/${guild.id}/settings.json`);
    if (!client.guilds.cache.get(guild.id).channels.cache.get(json.moderationLoggingChannel)) return;
    const logging = new MessageEmbed()
        .setTitle(`Ban Logs`)
        .setDescription(`${member.user.tag} has been banned off this server for ${reason}`)
        .setColor(`#ee110f`)
        .setThumbnail(`${member.user.displayAvatarURL()}`)
        .setFooter(`${member.user.username} was banned by ${reporter.user.username}`);
    client.guilds.cache.get(guild.id).channels.cache.get(json.moderationLoggingChannel).send(logging);
}

function muteLog(client, member, guild, reason, reporter) {
    const json = require(`./../data/guild/${guild.id}/settings.json`);
    if (!client.guilds.cache.get(guild.id).channels.cache.get(json.moderationLoggingChannel)) return;
    const logging = new MessageEmbed()
        .setTitle(`Mute Logs`)
        .setDescription(`${member.user.tag} has been banned off this server for ${reason}`)
        .setColor(`#ee110f`)
        .setThumbnail(`${member.user.displayAvatarURL()}`)
        .setFooter(`${member.user.username} was banned by ${reporter.user.username}`);
    client.guilds.cache.get(guild.id).channels.cache.get(json.moderationLoggingChannel).send(logging);
}

function kickLog(client, member, guild, reason, reporter) {
    const json = require(`./../data/guild/${guild.id}/settings.json`);
    if (!client.guilds.cache.get(guild.id).channels.cache.get(json.moderationLoggingChannel)) return;
    const logging = new MessageEmbed()
        .setTitle(`Kick Logs`)
        .setDescription(`${member.user.tag} has been banned off this server for ${reason}`)
        .setColor(`#ee110f`)
        .setThumbnail(`${member.user.displayAvatarURL()}`)
        .setFooter(`${member.user.username} was banned by ${reporter.user.username}`);
    client.guilds.cache.get(guild.id).channels.cache.get(json.moderationLoggingChannel).send(logging);
}

function warnLog(client, member, guild, reason, reporter) {
    const json = require(`./../data/guild/${guild.id}/settings.json`);
    if (!client.guilds.cache.get(guild.id).channels.cache.get(json.moderationLoggingChannel)) return;
    const logging = new MessageEmbed()
        .setTitle(`Warn Logs`)
        .setDescription(`${member.user.tag} has been banned off this server for ${reason}`)
        .setColor(`#ee110f`)
        .setThumbnail(`${member.user.displayAvatarURL()}`)
        .setFooter(`${member.user.username} was banned by ${reporter.user.username}`);
    client.guilds.cache.get(guild.id).channels.cache.get(json.moderationLoggingChannel).send(logging);
}

// Export

exports.banLog = banLog;
exports.muteLog = muteLog;
exports.kickLog = kickLog;
exports.warnLog = warnLog;