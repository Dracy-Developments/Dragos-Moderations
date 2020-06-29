const fs = require('fs');

function muteUser(userID, guildID) {
    const json = require(`../data/guild/${guildID}/settings.json`);
    json.muted.push(userID);
    fs.writeFileSync('../data/guild/${guildID}/settings.json', JSON.stringify(json));
}
exports.muteUser = muteUser;


function pardonMute(userID, guildID) {
    const json = require(`../data/guild/${guildID}/settings.json`);
    if (json.blacklisted.includes(guildID)) {
        const index = json.blacklisted.indexOf(guildID);
        if (index > -1) {
            json.blacklisted.splice(index, 1);
        }
        fs.writeFileSync(`../data/guild/${guildID}/settings.json`, JSON.stringify(json));
    }

}
exports.pardonMute = pardonMute;
