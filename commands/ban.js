const { SlashCommandBuilder } = require("@discordjs/builders")
const  Interaction  = require("discord.js")
const Discord = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("ban user")
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
        let modRole = interaction.guild.roles.cache.find(val => val.name === 'Moder')
        
        if (interaction.guild.members.cache.get(interaction.user.id).permissions.has(Discord.Permissions.FLAGS.MANAGE_MESSAGES) || interaction.guild.members.cache.get(interaction.user.id).permissions.has(Discord.Permissions.FLAGS.ADMINISTRATOR) || interaction.user.id === config.OWNER || interaction.user.id === '754381104034742415') {
            if (user === interaction.user) return interaction.reply('You cannot ban yourself')
           // if(interaction.guild.members.cache.user.permissions.has(Discord.Permissions.FLAGS.MANAGE_MESSAGES))return interaction.reply('You cannot ban Moder')
        interaction.guild.members.fetch(interaction.client.user.id).then(member => {
            if (!member.permissions.has(Discord.Permissions.FLAGS.MANAGE_ROLES)) return interaction.reply('Bot has insufficant Perms').catch(console.error)
        })
        interaction.guild.members.fetch(user.id).then(member => {
            member.kick().catch(err => console.error(err))
        })
            const embed = new Discord.MessageEmbed()
            .setColor('#00ffff')
             .setTitle(`banned ${user}`)
             .setDescription(`reason: ${reason}`)
             .setThumbnail(user.displayAvatarURL())
             interaction.reply({ embeds: [embed] })
        }else {
            interaction.reply('Insufficant Permissions')
        }
       
    }
}