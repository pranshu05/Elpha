const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require('discord.js') 
const Modlog = require("../models/Modlog")
const Muted = require("../models/Muted")
module.exports = {
    data: new SlashCommandBuilder()
    .setName("unmute")
    .setDescription("unmute user")
    .addUserOption(option => option.setName('user').setDescription('user').setRequired(true)
    ),
    async execute(interaction) {
        const user = interaction.options.getUser('user')
        const muteRole = interaction.guild.roles.cache.find(val => val.name === 'Mute')
        const modlog = await Modlog.findOne({guild_id: interaction.guild.id})
        const insf_perms = new Discord.MessageEmbed()
        .setColor('#FF0000')
	    .setTitle(`**:x: Insufficient Permission!**`)
        .setDescription(`You don't have permission to use this command.`)
        const no_mute_perms = new Discord.MessageEmbed()
        .setColor('#FF0000')
        .setTitle(`**:x: Couldn't Unmute Member!**`)
        .setDescription(`I don't have permission to manage roles.`)
        const unmute_embed = new Discord.MessageEmbed()
        .setColor('#00ffff')
        .setTitle(`Unmuted ${user.username}`)
        .setDescription( `moderator: ${interaction.user.username}`)
        .setThumbnail(user.displayAvatarURL())
        const unmute_db_fail = new Discord.MessageEmbed()
        .setColor('#FF0000')
        .setTitle(`**:x: DataBase Error!**`)
        .setDescription(`An error occurred while removing muted user from database!`)
        const modlog_perms = new Discord.MessageEmbed()
        .setColor('#FF0000')
        .setTitle(`**:x: Message Error!**`)
        .setDescription(`I don't have permission to send message in modlogs channel!`)
        if (interaction.guild.members.cache.get(interaction.user.id).permissions.has(Discord.Permissions.FLAGS.MANAGE_MESSAGES) || interaction.guild.members.cache.get(interaction.user.id).permissions.has(Discord.Permissions.FLAGS.ADMINISTRATOR) || interaction.user.id === '754381104034742415') {
            if(!interaction.guild.me.permissions.has(Discord.Permissions.FLAGS.MANAGE_ROLES)){
                return interaction.reply({embeds: [no_mute_perms]})
            }
            if(!interaction.guild.members.fetch(user.id).then(member => {
                member.roles.has(muteRole)
            })){
                interaction.reply(`User havn't be muted yet!`)
                return
            }
            interaction.guild.members.fetch(user.id).then(member => {
                member.roles.remove(muteRole).catch(err => console.error(err))
            })
            Muted.deleteOne({guild_id: interaction.guild.id}, (err, settings) => {
                if(err){
                    console.log(err)
                    interaction.reply({embeds: [unmute_db_fail]})
                    return
                }
            })
            interaction.reply({ embeds: [unmute_embed] })
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
                abc.send({embeds: [unmute_embed]})	
            }
            user.send(`You were unmuted in ${interaction.guild.name}`).catch(console.error)
        } else { 
            interaction.reply({embeds: [insf_perms]})
        }
    }
}