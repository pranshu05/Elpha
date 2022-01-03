const mongoose = require('mongoose')
const GuildSettingsSchema = new mongoose.Schema({
	guild_id: String,
	welcome_channel_id: String,
	general_channel_id: String,
})
module.exports = mongoose.model("GuildSettings", GuildSettingsSchema)