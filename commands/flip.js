const { SlashCommandBuilder } = require('@discordjs/builders')
const Discord = require('discord.js')
module.exports = {
    data: new SlashCommandBuilder()
        .setName('flip')
        .setDescription('Flip a Coin'),
    async execute(interaction) {
        let flip = [
            'tails',
            'heads',
        ]
        let index = (Math.floor(Math.random() * Math.floor(flip.length)))
        const embed = new Discord.MessageEmbed()
        .setColor('00FFFF')
        .setTitle(flip[index])
        .setFooter(`Flipped for ${interaction.user.username}`)
        interaction.reply({ embeds: [embed] })
    }
}