const { SlashCommandBuilder } = require('@discordjs/builders')
const Discord = require('discord.js')
module.exports = {
    data: new SlashCommandBuilder()
        .setName('roll')
        .setDescription('Roll a dice'),
    async execute(interaction) {
        let dicenum = [
            ':one:',
            ':two:',
            ':three:',
            ':four:',
            ':five:',
            ':six:',
        ]
        let index = (Math.floor(Math.random() * Math.floor(dicenum.length)))
        const embed = new Discord.MessageEmbed()
        .setColor('00FFFF')
        .setTitle(dicenum[index] )
        interaction.reply({ embeds: [embed] })
    }
}