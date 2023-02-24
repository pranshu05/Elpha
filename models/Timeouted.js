const mongoose = require('mongoose')

const TimeoutedSchema = new mongoose.Schema({
    guild_id: String,
    user_id: String,
    dutation: String,
    moderatorId: String,
    reason: String,
})

module.exports = mongoose.model('Timeouted', TimeoutedSchema)
