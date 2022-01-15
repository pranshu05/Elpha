const mongoose = require('mongoose')
const RoleSchema = new mongoose.Schema({
    guild_id: String,
	role: String,
})
module.exports = mongoose.model("Role", RoleSchema)