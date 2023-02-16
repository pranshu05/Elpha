const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require('discord.js')
const Modlog = require("../models/Modlog")
const Locked = require("../models/Locked")
module.exports = {
    data: new SlashCommandBuilder()
    .setName("unlockchannel")
    .setDescription("unlocks selected channel")
    .addChannelOption(option => option.setName('channel').setDescription('channel to unlock').setRequired(true))
    .addStringOption(option => option.setName('reason').setDescription('reason').setRequired(true)),
    async execute(interaction) {
        const reason = interaction.options.getString('reason')
        const channel = interaction.options.getChannel('channel')
        const modlog = await Modlog.findOne({guild_id: interaction.guild.id})
        const locked_channel = Locked.findOne({guild_id: interaction.guild.id, channelname: channel.name})
        const insf_perms = new Discord.MessageEmbed()
        .setColor('#FF0000')
	    .setTitle(`**:x: Insufficient Permission!**`)
        .setDescription(`You don't have permission to use this command.`)
        const no_channel_perms = new Discord.MessageEmbed()
        .setColor('#FF0000')
	    .setTitle(`**:x: Couldn't unlock the Channel!**`)
        .setDescription(`I don't have permission to manage channels.`)
        const invalid_channel = new Discord.MessageEmbed()
        .setColor('#FF0000')
	    .setTitle(`**:x: Invalid Channel**`)
        .setDescription(`This command is only applicable for text channels`)
        const unlocked_embed = new Discord.MessageEmbed()
        .setColor('#00ff00')
        .setTitle(`**:white_check_mark: Unlocked ${channel.name}**`)
        .setDescription(`reason: ${reason}\n` + `moderator: ${interaction.user.username}`)
        const unlock_db_fail = new Discord.MessageEmbed()
        .setColor('#FF0000')
	    .setTitle(`**:x: DataBase Error!**`)
        .setDescription(`An error occurred while adding locked channel to database!`)
        const modlog_perms = new Discord.MessageEmbed()
        .setColor('#FF0000')
	    .setTitle(`**:x: Message Error!**`)
        .setDescription(`I don't have permission to send message in modlogs channel!`)
        if(interaction.guild.members.cache.get(interaction.user.id).permissions.has(Discord.Permissions.FLAGS.MANAGE_MESSAGES) || interaction.guild.members.cache.get(interaction.user.id).permissions.has(Discord.Permissions.FLAGS.ADMINISTRATOR) || interaction.user.id === '754381104034742415') {
            if(!interaction.guild.me.permissions.has(Discord.Permissions.FLAGS.MANAGE_CHANNELS)){
                return interaction.reply({embeds: [no_channel_perms]})
            }
            if(!locked_channel){
                interaction.reply(`That channel isn't locked!`)
            }
            if(interaction.options.getChannel("channel").type !== 'GUILD_TEXT'){
			    interaction.reply({embeds: [invalid_channel]})
			    return
            }  
            channel.permissionOverwrites.edit(channel.guild.roles.everyone, {SEND_MESSAGES: true })
            interaction.reply({ embeds: [unlocked_embed] })
            Locked.deleteOne({guild_id: interaction.guild.id, channelname: channel.name}, (err, settings) => {
                if(err){
                    console.log(err)
                    interaction.reply({embeds: [unlock_db_fail]})
                    return
                }
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
                abc.send({embeds: [unlocked_embed]})	
            }
        } else {
            interaction.reply({embeds: [insf_perms]})
        }
    }
}