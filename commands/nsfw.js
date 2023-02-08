require("dotenv").config()
const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require("discord.js")
const fetch = require("node-fetch")
module.exports = {
  data: new SlashCommandBuilder()
    .setName("nsfw")
    .setDescription("WARNING! nsfw content 18+ only"),
  async execute(interaction) {
       let keywords = [
          'horny jail',
          'no horny',
          'anti horny',
       ]
       let keyword = (Math.floor(Math.random() * Math.floor(keywords.length)))
       let sentances = [
          'What were you expecting?',
          'You horny jerk!',
          'I will send you to Jesus',
          'Go to horny jail',
          'Jesus is knocking on your door',
          'I am sending FBI',
       ]
       let sentance = (Math.floor(Math.random() * Math.floor(sentances.length)))
       let url = `https://g.tenor.com/v1/search?q=${keyword}&key=${process.env.tenor}&limit=8`
       let response = await fetch(url)
       let json = await response.json()
       let random_url = Math.floor(Math.random() * json.results[0].length)
       interaction.reply(`LMAO ${interaction.user}, ${sentance} \n json.results[random_url].url`)
  }
}
