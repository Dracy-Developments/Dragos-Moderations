const fs = require('fs');

function banGuild(guildID) {
    const json = require(`../data/config.json`);
    json.blacklisted.push(guildID);
    fs.writeFileSync(`./../data/config.json`);
}
exports.banGuild = banGuild;

function isGuildBanned(guildID) {
    const json = require(`../data/config.json`);
    if(json.blacklisted.includes(guildID)) {
        return true;
    }
else{
        return false;
    }
}
exports.isGuildBanned = isGuildBanned;

