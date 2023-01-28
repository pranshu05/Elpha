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
        const reason = interaction.options.getString('reason')
        const user = interaction.options.getUser('user')
        const targetMember = interaction.guild.members.cache.get(user.id)
        const modlog = await Modlog.findOne({guild_id: interaction.guild.id})
        const insf_perms = new Discord.MessageEmbed()
        .setColor('#FF0000')
	    .setTitle(`**:x: Insufficient Permission!**`)
        .setDescription(`You don't have permission to use this command.`)
        const no_kick_perms = new Discord.MessageEmbed()
        .setColor('#FF0000')
	    .setTitle(`**:x: Couldn't Kick Member!**`)
        .setDescription(`I don't have permission to kick members.`)
        const kicked_embed = new Discord.MessageEmbed()
        .setColor('#00ffff')
        .setTitle(`Kicked ${user.username}`)
        .setDescription(`reason: ${reason}\n` + `moderator: ${interaction.user.username}`)
        .setThumbnail(user.displayAvatarURL())
        const kick_db_fail = new Discord.MessageEmbed()
        .setColor('#FF0000')
	    .setTitle(`**:x: DataBase Error!**`)
        .setDescription(`An error occurred while adding kicked user to database!`)
        const modlog_perms = new Discord.MessageEmbed()
        .setColor('#FF0000')
	    .setTitle(`**:x: Message Error!**`)
        .setDescription(`I don't have permission to send message in modlogs channel!`)
        if(!interaction.guild.me.permissions.has(Discord.Permissions.FLAGS.KICK_MEMBERS)){
            return interaction.reply({embeds: [no_kick_perms]})
        }
        if (interaction.guild.members.cache.get(interaction.user.id).permissions.has(Discord.Permissions.FLAGS.MANAGE_MEMBERS)) {
             if (user.id === '754381104034742415') return interaction.reply('You cannot kick my developer')
             if (user === interaction.user) return interaction.reply('You cannot kick yourself')
             if (user === interaction.client.user) return interaction.reply('You cannot kick me')
             if (interaction.guild.members.cache.get(user.id).permissions.has(Discord.Permissions.FLAGS.MANAGE_MESSAGES) || interaction.guild.members.cache.get(user.id).permissions.has(Discord.Permissions.FLAGS.ADMINISTRATOR) || user.id === '754381104034742415') {return interaction.reply('You cannot kick Moder')}
                targetMember.kick().catch(err => console.error(err))
                interaction.reply({ embeds: [kicked_embed] })
                Kicked.findOne({guild_id: interaction.guild.id}, (err, settings) => {
                if (err) {
                    console.log(err)
                    interaction.reply({embeds: [kick_db_fail]})
                    return
                }else {
                    settings = new Kicked({
                        guild_id: interaction.guild.id,
                        user_id: user.id,
                        moderatorId: interaction.user.id,
                        reason: interaction.options.getString('reason'),
                    })
                } 
                settings.save(err => {
                    if (err) {
                        console.log(err)
                        interaction.reply({embeds: [kick_db_fail]})
                        return
                    }
                })
            })
             if (!modlog) {
                return
            }else{
                const abc = interaction.guild.channels.cache.get(modlog.modlog_channel_id)
                    if(!interaction.guild.me.permissionsIn(abc).has(Discord.Permissions.FLAGS.SEND_MESSAGES)){
                        if(interaction.guild.me.permissionsIn(interaction.channel).has(Discord.Permissions.FLAGS.SEND_MESSAGES)){
                              interaction.channel.send({embeds: [modlog_perms]})
                              return 
                        }
                        return 
                    }
                    abc.send({
                        embeds: [kicked_embed] 
                    })	
            }
            user.send(`You were kicked from ${interaction.guild.name}`).catch(console.error)
        } else {
            interaction.reply({embeds: [insf_perms]})
        } 
    }
}