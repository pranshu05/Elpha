const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require('discord.js')
const Permissions = require('discord.js')
const Modlog = require("../models/Modlog")
const Banned = require("../models/Banned")
module.exports = {
    data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("ban user")
    .addUserOption(option => option.setName('user').setDescription('user').setRequired(true))
    .addStringOption(option => option.setName('reason').setDescription('reason').setRequired(true)),
    async execute(interaction) {
        const reason = interaction.options.getString('reason')
        const user = interaction.options.getUser('user')
        const member = await interaction.guild.members.fetch(user.id)
        const modlog = await Modlog.findOne({guild_id: interaction.guild.id})
        const insf_perms = new Discord.MessageEmbed()
        .setColor('#FF0000')
	    .setTitle(`**:x: Insufficient Permission!**`)
        .setDescription(`You don't have permission to use this command.`)
        const no_ban_perms = new Discord.MessageEmbed()
        .setColor('#FF0000')
	    .setTitle(`**:x: Couldn't Ban Member!**`)
        .setDescription(`I don't have permission to ban members.`)
        const banned_embed = new Discord.MessageEmbed()
        .setColor('#00ff00')
        .setTitle(`**:white_check_mark: Banned ${user.username}**`)
        .setDescription(`reason: ${reason}\n` + `moderator: ${interaction.user.username}`)
        .setThumbnail(user.displayAvatarURL())
        const ban_db_fail = new Discord.MessageEmbed()
        .setColor('#FF0000')
	    .setTitle(`**:x: DataBase Error!**`)
        .setDescription(`An error occurred while adding banned user to database!`)
        const modlog_perms = new Discord.MessageEmbed()
        .setColor('#FF0000')
	    .setTitle(`**:x: Message Error!**`)
        .setDescription(`I don't have permission to send message in modlogs channel!`)
        if(!interaction.guild.me.permissions.has(Discord.Permissions.FLAGS.BAN_MEMBERS)){
            return interaction.reply({embeds: [no_ban_perms]})
        }
        if(interaction.guild.members.cache.get(interaction.user.id).permissions.has(Discord.Permissions.FLAGS.BAN_MEMBERS)){
            if(user.id === '754381104034742415') return interaction.reply('**You cannot ban my developer**')
            if(user === interaction.user) return interaction.reply('**You cannot ban yourself**')
            if(user === interaction.client.user) return interaction.reply('**You cannot ban me**')
            if(user === interaction.guild.owner) return interaction.reply('**You cannot ban owner of this server!**')
            if(!member.bannable) return interaction.reply('I cannot kick the member because they have roles above me or you!')
            if(interaction.guild.members.cache.get(user.id).permissions.has(Discord.Permissions.FLAGS.MANAGE_MESSAGES) || interaction.guild.members.cache.get(user.id).permissions.has(Discord.Permissions.FLAGS.ADMINISTRATOR)) return interaction.reply('**You cannot ban member with higher roles!**')
                interaction.guild.members.fetch(user.id).then(member => {
                member.ban().catch(err => console.error(err))
            })
            interaction.reply({embeds: [banned_embed]})
            Banned.findOne({guild_id: interaction.guild.id}, (err, settings) => {
                if(err){
                    console.log(err)
                    interaction.reply({embeds: [ban_db_fail]})
                    return
                }else{
                    settings = new Banned({
                    guild_id: interaction.guild.id,
                    user_id: user.id,
                    moderatorId: interaction.user.id,
                    reason: interaction.options.getString('reason'),                       
                    })
                } 
                settings.save(err => {
                    if(err){
                        console.log(err)
                        interaction.reply({embeds: [ban_db_fail]})
                        return
                    }
                })
            })
                if(!modlog){
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
                    abc.send({embeds: [banned_embed]})	
                }
                user.send(`You were banned from ${interaction.guild.name}`).catch(console.error)
            }else{
                interaction.reply({embeds: [insf_perms]})
            }
    }
}
