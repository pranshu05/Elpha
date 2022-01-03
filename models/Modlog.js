const mongoose = require('mongoose')
const ModlogSchema = new mongoose.Schema({
    guild_id: String,
	modlog_channel_id: String,
})
module.exports = mongoose.model("Modlog", ModlogSchema)