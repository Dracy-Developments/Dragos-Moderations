const fs = require('fs');

function muteUser(userID, guildID, reason, duration = "3d") {
    const json = require(`../data/guild/${guildID}/settings.json`);
    console.log(JSON.stringify(json));
    json.muted.push(userID);
    fs.writeFileSync(`./data/guild/${guildID}/settings.json`, JSON.stringify(json));
    console.log(JSON.stringify(json));
    const mjson = require(`../data/guild/${guildID}/member/${userID}/settings.json`);
    mjson.cases.push({ "violation":"mute", "date":`${Date.now()}`, "reason":reason, "duration": duration });
    fs.writeFileSync(`./data/guild/${guildID}/member/${userID}/settings.json`, JSON.stringify(mjson));
}


function pardonMute(userID, guildID) {
    const json = require(`../data/guild/${guildID}/settings.json`);
    console.log(JSON.stringify(json));
    const position = json.muted.indexOf(userID);
    json.muted.splice(position, 1);
    exports.muteUser = muteUser;
    fs.writeFileSync(`./data/guild/${guildID}/settings.json`, JSON.stringify(json));
    console.log(JSON.stringify(json));
}
exports.pardonMute = pardonMute;
