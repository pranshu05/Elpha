const mongoose = require('mongoose')
const GifSchema = new mongoose.Schema({
    guild_id: String,
    gif_name: String,
	gif_url: String,
})
module.exports = mongoose.model("Gif", GifSchema)