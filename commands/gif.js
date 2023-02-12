require("dotenv").config()
const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require('discord.js')
const fetch = require("node-fetch")
module.exports = {
    data: new SlashCommandBuilder()
    .setName("gif")
    .setDescription("search for gif")
    .addStringOption(option =>
        option.setName('name')
            .setDescription('name of the GIF')
            .setRequired(true)
    ),
    async execute(interaction) {
        const name = interaction.options.getString('name')
        let url = `https://tenor.googleapis.com/v2/search?q=${name}&key=${process.env.tenor}&client_key=my_test_app&limit=50`
        let response = await fetch(url)
        let json = await response.json()
        let url_index = Math.floor(Math.random() * json.results.length)
        let random_url = json.results[url_index].url
        interaction.reply(`${random_url}`)
    }
}