const mongoose = require('mongoose');
const violationSchema = mongoose.Schema({
    violatorUsername: String,
    violatorID: String,
    type: String,
    guildID: String,
    reporterUsername: String,
    reporterUsernameID: {type: Number, default: 1},
});
module.exports = mongoose.model('Pets', petSchema)