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
        .addField('Top.gg', '**[Here](https://top.gg/bot/916613852362330133)**')
        .addField('DBL', '**[Here](https://discordbotlist.com/bots/elpha)**')
        .addField('Discords', '**[Here](https://discords.com/bots/bot/916613852362330133)**')
        .addField('Discord list', '**[Here](https://discordlist.gg/bot/916613852362330133)**')
        .addField('Discord bots', '**[Here](https://discord.bots.gg/bots/916613852362330133)**')
        .setTimestamp()
    interaction.reply({ embeds: [embed] })
    }
}