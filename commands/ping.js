

const { SlashCommandBuilder } = require('@discordjs/builders')
const Discord = require('discord.js')
const fs = require('fs')
const dir = './commands'
let commandsLength = 0
const pkg = require('../package.json')
const os = require('os')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Pong!'),
    async execute(interaction) {
     
        const config = interaction.client.config
        const args = interaction.options.getString('flags')
        const embed = new Discord.MessageEmbed()
            .setColor('#00ffff')
            .setTimestamp()
            .setTitle(`Pong!`)
            .addField('🏓 Ping', `${(interaction.client.ws.ping).toFixed(0)} ms`, true)
        interaction.reply({ embeds: [embed] })
    }
}