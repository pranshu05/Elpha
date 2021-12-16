const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName("mute")
    .setDescription("mute user")
    .addUserOption(option =>
        option.setName('user')
            .setDescription('user')
            .setRequired(true)
    )
    .addStringOption(option =>
        option.setName('reason')
            .setDescription('reason')
            .setRequired(true)
    ),

    async execute(interaction) {

        var reason = interaction.options.getString('reason')
        var user = interaction.options.getUser('user')
        const muteRole = interaction.guild.roles.cache.find(val => val.name === 'Mute')
        
        if (interaction.guild.members.cache.get(interaction.user.id).permissions.has(Discord.Permissions.FLAGS.MANAGE_MESSAGES) || interaction.guild.members.cache.get(interaction.user.id).permissions.has(Discord.Permissions.FLAGS.ADMINISTRATOR) || interaction.user.id === '754381104034742415') {
            if (user.id === '754381104034742415') {return interaction.reply('You cannot mute my developer')}
            if (user === interaction.user) return interaction.reply('You cannot mute yourself')
            if (user === interaction.client.user) return interaction.reply('You cannot mute me')
            if (interaction.guild.members.cache.get(user.id).permissions.has(Discord.Permissions.FLAGS.MANAGE_MESSAGES) || interaction.guild.members.cache.get(user.id).permissions.has(Discord.Permissions.FLAGS.ADMINISTRATOR) || user.id === '754381104034742415') {return interaction.reply('You cannot mute Moder')}
            if (!muteRole) return interaction.reply('Mute Role required')
            if (user.id === '754381104034742415') {return interaction.reply('You cannot mute my developer')}
       
        interaction.guild.members.fetch(user.id).then(member => {
            member.roles.add(muteRole).catch(err => console.error(err))
        })
            const embed = new Discord.MessageEmbed()
            .setColor('#00ffff')
             .setTitle(`Muted ${user}`)
             .setDescription(`reason: ${reason}`)
             .setThumbnail(user.displayAvatarURL())
             interaction.reply({ embeds: [embed] })
        } else {
            interaction.reply('Insufficant Permissions')
        }
       
    }
}