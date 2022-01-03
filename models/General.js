const mongoose = require('mongoose')
const GeneralSchema = new mongoose.Schema({
    guild_id: String,
	general_channel_id: String,
})
module.exports = mongoose.model("General", GeneralSchema)