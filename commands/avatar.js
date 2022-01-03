const { SlashCommandBuilder } = require("@discordjs/builders")
const  Interaction  = require("discord.js")
const Discord = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName("avatar")
    .setDescription("user's avatar")
    .addUserOption(option =>
        option.setName('user')
            .setDescription('user avatar')
            .setRequired(true)
    ),
    async execute(interaction) {
        var user = interaction.options.getUser('user')
        const embed = new Discord.MessageEmbed()
       .setColor('#00ffff')
        .setTitle(`${user.username}'s Avatar`)
        .setImage(user.displayAvatarURL({size: 2048}))
        interaction.reply({ embeds: [embed] })
    }
}