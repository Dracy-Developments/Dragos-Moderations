const fs = require('fs');

function banGuild(guildID) {
    const json = require(`../data/config.json`);
    json.blacklisted.push(guildID);
    fs.writeFileSync('./data/config.json', JSON.stringify(json));
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

function pardonGuild(guildID) {
    const json = require('../data/config.json');
    if (json.blacklisted.includes(guildID)) {
        const index = json.blacklisted.indexOf(guildID);
        if (index > -1) {
            json.blacklisted.splice(index, 1);
        }
        fs.writeFileSync('./data/config.json', JSON.stringify(json));
    }

}
exports.pardonGuild = pardonGuild;
