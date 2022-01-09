const mongoose = require('mongoose')
const WarnedSchema = new mongoose.Schema({
    guild_id: String,
	user_id: String,
    moderatorId: String,
    warning: String,
})
module.exports = mongoose.model("Warned", WarnedSchema)