const { SlashCommandBuilder } = require('@discordjs/builders')
const Discord = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('nsfw')
        .setDescription('WARNING! nsfw content 18+'),

    async execute(interaction) {

        let eightball = [
            'https://c.tenor.com/LJKTSD9hZHQAAAAM/shame-on-you-how-dare-you.gif',
            'https://c.tenor.com/sign51fHK0kAAAAM/smh-kanyewest.gif',
            'https://c.tenor.com/CwHsyBGtIr4AAAAM/dwight-schrute-the-office.gif',
            'https://c.tenor.com/bFmN6KkomcYAAAAM/spider-man-go-to-the-shame-corner.gif',
            'https://c.tenor.com/8wLU9UiDhNMAAAAM/kristen-bell-smh.gif',
            'https://c.tenor.com/-XmjZMPp3kYAAAAM/shame-on-you-tsk-tsk.gif',
            'https://c.tenor.com/Ua2g7F4cawcAAAAM/im-just-disappointed-in-you-priscilla-owens.gif',
            'https://c.tenor.com/63cO1G1AaX4AAAAM/shame-on.gif',
            'https://c.tenor.com/BXjuX2oibK8AAAAM/shame-shame-on-you.gif',
            'https://c.tenor.com/u7lPRIZwv00AAAAM/bahut-tez.gif',
            'https://c.tenor.com/y-r4qV_yEXsAAAAM/kareena-kapoor-khan-angrezi-medium.gif',
    ]

        let index = (Math.floor(Math.random() * Math.floor(eightball.length)));

        const embed = new Discord.MessageEmbed()
        .setColor('#00ffff')
        .setImage(eightball[index])
    interaction.reply({ embeds: [embed] })
    }
}