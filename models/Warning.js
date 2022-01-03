const mongoose = require('mongoose')
const WarningSchema = new mongoose.Schema({
    guild_id: String,
    user_id: String,
	warning: String,
    moderatorId: String,
})
module.exports = mongoose.model("Warning", WarningSchema)