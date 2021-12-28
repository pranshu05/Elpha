const { SlashCommandBuilder } = require('@discordjs/builders')
const Discord = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('flip')
        .setDescription('Flip a Coin'),
    async execute(interaction) {
        let eightball = [
            'tails',
            'heads',
        ]
        let index = (Math.floor(Math.random() * Math.floor(eightball.length)))
        const embed = new Discord.MessageEmbed()
        .setColor('00FFFF')
        .setTitle(eightball[index] )
        interaction.reply({ embeds: [embed] })
    }
}