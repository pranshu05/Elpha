const { SlashCommandBuilder } = require('@discordjs/builders')
const Discord = require('discord.js')
const fetch = require('node-fetch')
module.exports = {
    data: new SlashCommandBuilder()
    .setName('quote')
    .setDescription('sends rendom quote'),
    async execute(interaction) {
        let url = `https://type.fit/api/quotes`
        let response = await fetch(url)
        let json = await response.json()
        console.log(json)
        interaction.reply({content: 'Command under dev rn!', ephemral: true})
    }
}