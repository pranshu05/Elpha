const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require('discord.js')
const fetch = require("node-fetch")
module.exports = {
    data: new SlashCommandBuilder()
    .setName("http status")
    .setDescription("sends http code status with image")
    .addIntegerOption(option =>
        option.setName('status')
            .setDescription('http status')
            .setRequired(true)
    ),
    async execute(interaction) {
        const status = interaction.options.getInteger('status')
        let url = `https://http.cat/${status}`
        let response = await fetch(url)
        if(response.status === 404){
            interaction.reply(`No status found of code : **${status}**`)
        }else{
            interaction.reply(url)
        }
    }
}