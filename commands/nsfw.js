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
       let keyword_index = (Math.floor(Math.random() * Math.floor(keywords.length)))
       let keyword = keywords[keyword_index]
       let sentances = [
          'What were you expecting?',
          'You horny jerk!',
          'I will send you to Jesus',
          'Go to horny jail',
          'Jesus is knocking on your door',
          'I am sending FBI',
       ]
       let sentance_index = (Math.floor(Math.random() * Math.floor(sentances.length)))
       let sentance = sentances[sentance_index]
       let url = `https://tenor.googleapis.com/v2/search?q=${keyword}&key=${process.env.tenor}&client_key=my_test_app&random=true`
       let response = await fetch(url)
       let json = await response.json()
       let random_url = json.results.url
       interaction.reply(`LMAO ${interaction.user}, ${sentance} \n ${random_url}`)
       console.log(json)
  }
}
