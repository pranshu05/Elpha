const mongoose = require('mongoose')
const LockedSchema = new mongoose.Schema({
    guild_id: String,
	channelname: String,
    moderatorId: String,
    reason: String,
})
module.exports = mongoose.model("Locked", LockedSchema)