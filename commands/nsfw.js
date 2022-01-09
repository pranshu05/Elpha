const { SlashCommandBuilder } = require('@discordjs/builders')
const Discord = require('discord.js')
module.exports = {
    data: new SlashCommandBuilder()
        .setName('nsfw')
        .setDescription('WARNING! nsfw content 18+ only'),
    async execute(interaction) {
        let egif = [
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
            'https://c.tenor.com/olTVP9rBLuoAAAAM/you-naughty-naughty-pointing.gif',
            'https://c.tenor.com/pdDPCkLF2vEAAAAM/naughty.gif',
            'https://c.tenor.com/uBjg1oObWnYAAAAM/naughtynaughty-atharvakore.gif',
            'https://c.tenor.com/n8wXFR2JRVkAAAAM/behave-austin-powers.gif',
            'https://c.tenor.com/Oj8eXOmVwOAAAAAM/naughty-no.gif',
            'https://c.tenor.com/zN4rxp_K3NQAAAAM/youre-a-very-naughty-boy-youre-bad-boy.gif',
            'https://c.tenor.com/OvCO9wv3qWcAAAAM/raise-eyebrow-sexy.gif',
            'https://c.tenor.com/DfSs6KiP6-kAAAAM/akshay-kumar-smile.gif',
            'https://c.tenor.com/zK6-iEBjjcEAAAAS/no-nooo.gif',
            ]
        let index = (Math.floor(Math.random() * Math.floor(egif.length)))
        const embed = new Discord.MessageEmbed()
        .setColor('#00ffff')
        .setImage(egif[index])
        interaction.reply({ embeds: [embed] })
    }
}