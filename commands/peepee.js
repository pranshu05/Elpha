const { SlashCommandBuilder } = require('@discordjs/builders')
const Discord = require('discord.js')
module.exports = {
    data: new SlashCommandBuilder()
    .setName('pp')
    .setDescription('How long is your pp?'),
        async execute(interaction) {
        let pp = [
            '8==D',
            '8===D',
            '8====D',
            '8=====D',
            '8======D',
            '8=======D',
            '8========D',
            'Oops its too large cannot fit in the message',
        ]
        let index = (Math.floor(Math.random() * Math.floor(pp.length)))
        const embed = new Discord.MessageEmbed()
        .setColor('#00FFFF')
        .setTitle('Ratemachine PP')
        .setDescription(`${interaction.member} has pp of size ${pp[index]} `)
        interaction.reply({ embeds: [embed] })
    }
}