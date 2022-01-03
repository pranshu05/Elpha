const mongoose = require('mongoose')
const LeaveSchema = new mongoose.Schema({
	guild_id: String,
	goodbye_channel_id: String,
})
module.exports = mongoose.model("Leave", LeaveSchema)