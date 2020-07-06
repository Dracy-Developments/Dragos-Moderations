const { MessageEmbed } = require(`discord.js`);

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

async function errorLog(message, command, errMsg) {
    const errorMessage = new MessageEmbed()
        .setTitle(`❌ An Error Has Occured while executing ${command}`)
        .setDescription(`${errMsg}\n\u200b`)
        .setColor(`#ee110f`)
        .setThumbnail(`https://cdn.discordapp.com/emojis/604486986170105866.png?v=1`);
    message.channel.send(errorMessage).then(a => a.delete({ timeout: 15000 }));
}

function errorLogWithExample(message, command, errMsg, imageURL) {
    const errorMessage = new MessageEmbed()
        .setTitle(`❌ An Error Has Occured while executing ${command}`)
        .setDescription(`${errMsg}`)
        .setColor(`#ee110f`)
        .setImage(`${imageURL}`)
        .setThumbnail(`https://cdn.discordapp.com/emojis/604486986170105866.png?v=1`);
    message.channel.send(errorMessage).then(a => a.delete({ timeout: 15000 }));
}

// Export

exports.banLog = banLog;
exports.muteLog = muteLog;
exports.kickLog = kickLog;
exports.warnLog = warnLog;
exports.errorLog = errorLog;
exports.errorLogWithExample = errorLogWithExample;