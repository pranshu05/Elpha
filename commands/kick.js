const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require('discord.js')
const Modlog = require("../models/Modlog")
const Kicked = require("../models/Kicked")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("kick user")
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
        const modlog = await Modlog.findOne({guild_id: interaction.guild.id})
        if (interaction.guild.members.cache.get(interaction.user.id).permissions.has(Discord.Permissions.FLAGS.MANAGE_MESSAGES) || interaction.guild.members.cache.get(interaction.user.id).permissions.has(Discord.Permissions.FLAGS.ADMINISTRATOR) || interaction.user.id === '754381104034742415') {
             if (user.id === '754381104034742415') {return interaction.reply('You cannot kick my developer')}
             if (user === interaction.user) return interaction.reply('You cannot kick yourself')
             if (user === interaction.client.user) return interaction.reply('You cannot kick me')
             if (interaction.guild.members.cache.get(user.id).permissions.has(Discord.Permissions.FLAGS.MANAGE_MESSAGES) || interaction.guild.members.cache.get(user.id).permissions.has(Discord.Permissions.FLAGS.ADMINISTRATOR) || user.id === '754381104034742415') {return interaction.reply('You cannot kick Moder')}
        interaction.guild.members.fetch(user.id).then(member => {
            member.kick().catch(err => console.error(err))
        })
            const embed = new Discord.MessageEmbed()
            .setColor('#00ffff')
             .setTitle(`Kicked ${user.username}`)
             .setDescription(`reason: ${reason}\n` + `moderator: ${interaction.user.username}`)
             .setThumbnail(user.displayAvatarURL())
             interaction.reply({ embeds: [embed] })
             Kicked.findOne({guild_id: interaction.guild.id}, (err, settings) => {
                if (err) {
                    console.log(err)
                    interaction.reply("An error occurred while adding kicked user to database!")
                    return
                }else {
                    settings = new Kicked({
                        guild_id: interaction.guild.id,
                        user_id: user.id,
                        reason: interaction.options.getString('reason'),
                        moderatorId: interaction.user.id
                    })
                } 
                settings.save(err => {
                    if (err) {
                        console.log(err)
                        interaction.reply("An error occurred while adding kicked user to database!")
                        return
                    }
                })
            })
             if (!modlog) {
                return
            }else{
                const abc = interaction.guild.channels.cache.get(modlog.modlog_channel_id)
                if(!abc)return
                if (abc.type === 'voice') return
                abc.send({
                    embeds: [embed] 
                })
            }
        } else {
            interaction.reply('Insufficant Permissions')
        }
       
    }
}