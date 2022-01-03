const { SlashCommandBuilder } = require('@discordjs/builders')
const Discord = require('discord.js')
module.exports = {
    data: new SlashCommandBuilder()
        .setName('roll')
        .setDescription('Roll a dice'),
    async execute(interaction) {
        let eightball = [
            ':one:',
            ':two:',
            ':three:',
            ':four:',
            ':five:',
            ':six:',
        ]
        let index = (Math.floor(Math.random() * Math.floor(eightball.length)))
        const embed = new Discord.MessageEmbed()
        .setColor('00FFFF')
        .setTitle(eightball[index] )
        interaction.reply({ embeds: [embed] })
    }
}