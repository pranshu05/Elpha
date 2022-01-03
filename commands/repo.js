const { SlashCommandBuilder } = require('@discordjs/builders')
const Discord = require('discord.js')
module.exports = {
    data: new SlashCommandBuilder()
        .setName('repo')
        .setDescription('Github Repo Link'),
    async execute(interaction) {
        const embed = new Discord.MessageEmbed()
        .setColor('#00ffff')
        .setTimestamp()
        .setTitle(`Github Repo`)
        .addField('Repo link ', `[Here](https://github.com/Elphabot/Elpha) | Star this repo!`)
    interaction.reply({ embeds: [embed] })
    }
}