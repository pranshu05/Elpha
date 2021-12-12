const { SlashCommandBuilder } = require("@discordjs/builders");
const  Interaction  = require("discord.js");
const Discord = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName("unmute")
    .setDescription("unmute user")
    .addUserOption(option =>
        option.setName('user')
            .setDescription('user')
            .setRequired(true)
    ),

    async execute(interaction) {

        
        var user = interaction.options.getUser('user')
        const muteRole = interaction.guild.roles.cache.find(val => val.name === 'Mute')
        
        if (interaction.guild.members.cache.get(interaction.user.id).permissions.has(Discord.Permissions.FLAGS.MANAGE_MESSAGES) || interaction.guild.members.cache.get(interaction.user.id).permissions.has(Discord.Permissions.FLAGS.ADMINISTRATOR) || interaction.user.id === config.OWNER || interaction.user.id === '754381104034742415') {
            
        interaction.guild.members.fetch(interaction.client.user.id).then(member => {
            if (!member.permissions.has(Discord.Permissions.FLAGS.MANAGE_ROLES)) return interaction.reply('Bot has insufficant Perms').catch(console.error)
        })
        interaction.guild.members.fetch(user.id).then(member => {
            member.roles.remove(muteRole).catch(err => console.error(err))
        })
            const embed = new Discord.MessageEmbed()
            .setColor('#00ffff')
             .setTitle(`Unmuted ${user}`)
             .setThumbnail(user.displayAvatarURL())
             interaction.reply({ embeds: [embed] })
        } else {
            interaction.reply('Insufficant Permissions')
        }
       
    },
};