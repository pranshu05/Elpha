const { SlashCommandBuilder } = require("@discordjs/builders");
const  Interaction  = require("discord.js");
const Discord = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName("avatar")
    .setDescription("user's avatar"),

    async execute(interaction) {

        const embed = new Discord.MessageEmbed()

       .setColor('#00ffff')
        .setTitle(`Avatar`)
        .setImage(interaction.user.displayAvatarURL())
        interaction.reply({ embeds: [embed] })
    },
};