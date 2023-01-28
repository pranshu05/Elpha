const { SlashCommandBuilder } = require("@discordjs/builders")
const { Permissions } = require("discord.js")
const Discord = require('discord.js') 
const Leave = require("../models/Leave")
const Modlog = require("../models/Modlog")
module.exports = {
	data: new SlashCommandBuilder()
		.setName("setgoodbyechannel")
		.setDescription("Set the goodbye message channel")
		.addChannelOption(option => option
			.setName("goodbye")
			.setDescription("The channel to set as the goodbye channel")
			.setRequired(true)
		),
	async execute(interaction) {
		const insf_perms = new Discord.MessageEmbed()
        .setColor('#FF0000')
	    .setTitle(`**:x: Insufficient Permission!**`)
        .setDescription(`You don't have permission to use this command.`)
		const invalid_channel = new Discord.MessageEmbed()
        .setColor('#FF0000')
	    .setTitle(`**:x: Invalid Channel**`)
        .setDescription(`This command is only applicable for text channels`)
		const gb_embed = new Discord.MessageEmbed()
		.setColor('#00ff00')
		.setTitle(`**:white_check_mark: GoodBye channel has been set to ${interaction.options.getChannel("goodbye")}**`)
		const gb_db_fail = new Discord.MessageEmbed()
		.setColor('#FF0000')
		.setTitle(`**:x: DataBase Error!**`)
		.setDescription(`An error occurred while adding channel data to database!`)
		const modlog_perms = new Discord.MessageEmbed()
		.setColor('#FF0000')
		.setTitle(`**:x: Message Error!**`)
		.setDescription(`I don't have permission to send message in modlogs channel!`)
		const modlog = await Modlog.findOne({guild_id: interaction.guild.id})
		if (!interaction.member.permissions.has([ Permissions.FLAGS.MANAGE_CHANNELS , Permissions.FLAGS.MANAGE_MESSAGES , Permissions.FLAGS.MANAGE_ROLES , Permissions.FLAGS.ADMINISTRATOR ])) {
			interaction.reply({embeds: [insf_perms]})
			return
		} 
		if (interaction.options.getChannel("goodbye").type !== 'GUILD_TEXT') {
			interaction.reply({embeds: [invalid_channel]})
			return}
		Leave.findOne({ guild_id: interaction.guild.id }, (err, settings) => {
			if (err) {
				console.log(err)
				interaction.reply({embeds: [gb_db_fail]})
				return
			}
			if (!settings) {
				settings = new Leave({
					guild_id: interaction.guild.id,
					goodbye_channel_id: interaction.options.getChannel("goodbye").id
				})
			} else {
				settings.goodbye_channel_id = interaction.options.getChannel("goodbye").id
			}
			settings.save(err => {
				if (err) {
					console.log(err)
					interaction.reply({embeds: [gb_db_fail]})
					return
				}
				interaction.reply({embeds: [gb_embed]})
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
					abc.send({embeds: [gb_embed]})	
			}
		})
	}
}