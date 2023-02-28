const { SlashCommandBuilder } = require('@discordjs/builders')
const Discord = require('discord.js')
module.exports = {
    data: new SlashCommandBuilder()
    .setName('vote')
    .setDescription('Sends vote links'),
    async execute(interaction) {
        const embed = new Discord.MessageEmbed()
        .setColor('#00ffff')
        .setTitle(`:chart_with_upwards_trend: VOTE FOR THE BOT :chart_with_upwards_trend:`)
        .setDescription(`**Dear User you can vote me from following links. Please help me to win elections :)**`)
        .addFields(
            {name: 'Top.gg',value: '**[Here](https://top.gg/bot/916613852362330133)**', inline: true},
            {name: 'DBL',value: '**[Here](https://discordbotlist.com/bots/elpha)**', inline: true},
            {name: 'Discords',value: '**[Here](https://discords.com/bots/bot/916613852362330133)**', inline: true},
            {name: 'Discord list',value: '**[Here](https://discordlist.gg/bot/916613852362330133)**', inline: true},
            {name: 'Discord bots',value: '**[Here](https://discord.bots.gg/bots/916613852362330133)**', inline: true}
        )
        .setTimestamp()
    interaction.reply({ embeds: [embed] })
    }
}