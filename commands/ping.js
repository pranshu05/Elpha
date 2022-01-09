const { SlashCommandBuilder } = require('@discordjs/builders')
const Discord = require('discord.js')
module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Pong!'),
    async execute(interaction) {
        const embed = new Discord.MessageEmbed()
            .setColor('#00ffff')
            .setTimestamp()
            .setTitle(`Pong 🏓`)
            .addField('Latancy:', `${(interaction.client.ws.ping).toFixed(0)} ms`, true)
            .addField('API Latancy:', `${Date.now() - interaction.createdTimestamp}ms`)
            .setFooter(`counted for ${interaction.user.username}`)
        interaction.reply({ embeds: [embed] })
    }
}