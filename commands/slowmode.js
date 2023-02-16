const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require('discord.js') 
const Modlog = require("../models/Modlog")
module.exports = {
    data: new SlashCommandBuilder()
    .setName("slowmode")
    .setDescription("set slowmode of current channel")
    .addStringOption(option => option.setName('time').setDescription('slowmode time in seconds').setRequired(true)),
    async execute(interaction) {
        const time = interaction.options.getString('time')
        const modlog = await Modlog.findOne({guild_id: interaction.guild.id})
        const insf_perms = new Discord.MessageEmbed()
        .setColor('#FF0000')
	    .setTitle(`**:x: Insufficient Permission!**`)
        .setDescription(`You don't have permission to use this command.`)
        const no_channel_perms = new Discord.MessageEmbed()
        .setColor('#FF0000')
	    .setTitle(`**:x: Couldn't set Slowmode!**`)
        .setDescription(`I don't have permission to manage channels.`)
        const sm_embed = new Discord.MessageEmbed()
		.setColor('#00ff00')
		.setTitle(`**:white_check_mark: Slowmode for ${interaction.channel} is set for ${time} seconds**`)
		const modlog_perms = new Discord.MessageEmbed()
		.setColor('#FF0000')
		.setTitle(`**:x: Message Error!**`)
		.setDescription(`I don't have permission to send message in modlogs channel!`)
        if(interaction.guild.members.cache.get(interaction.user.id).permissions.has(Discord.Permissions.FLAGS.MANAGE_MESSAGES)){
            if(!interaction.guild.me.permissions.has(Discord.Permissions.FLAGS.MANAGE_CHANNELS)){
            return interaction.reply({embeds: [no_channel_perms]})
        }
            interaction.channel.setRateLimitPerUser(time)
            interaction.reply({ embeds: [sm_embed] })
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
                abc.send({
                embeds: [sm_embed] 
                })
            }
        }else{
            interaction.reply({embeds: [insf_perms]})
        }
    }
}
