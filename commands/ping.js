

const { SlashCommandBuilder } = require('@discordjs/builders')
const Discord = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Pong!'),
    async execute(interaction) {
     
        const embed = new Discord.MessageEmbed()
            .setColor('#00ffff')
            .setTimestamp()
            .setTitle(`Pong!`)
        interaction.reply({ embeds: [embed] })
    }
}