const { SlashCommandBuilder } = require('@discordjs/builders')
const Discord = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('dank')
    .setDescription('How dank are you?'),
        async execute(interaction) {
        const rate = Math.floor(Math.random() * 100) + 1
        const embed = new Discord.MessageEmbed()
        .setColor('#00FFFF')
        .setTitle('Ratemachine Dank')
        .setDescription(`${interaction.member} is ${rate.toString()} % dank`)
        interaction.reply({ embeds: [embed] })
    }
}