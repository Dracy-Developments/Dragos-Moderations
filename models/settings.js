const mongoose = require('mongoose');
const settingsSchema = mongoose.Schema({
    guildID: String,
    muteRole: String,
    strikeToggle: Boolean,
    maxStrike: Number,
    prefix: String,

});
module.exports = mongoose.model('Settings', settingsSchema);