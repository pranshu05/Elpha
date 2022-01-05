const mongoose = require('mongoose')
const BannedSchema = new mongoose.Schema({
    guild_id: String,
	user_id: String,
    moderatorID: String,
    reason: String,
})
module.exports = mongoose.model("Banned", BannedSchema)