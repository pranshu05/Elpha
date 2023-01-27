const { SlashCommandBuilder } = require("@discordjs/builders")
const { Permissions} = require("discord.js")
const Discord = require('discord.js') 
const Gif = require("../models/Gif")
module.exports = {
	data: new SlashCommandBuilder()
		.setName("removegif")
		.setDescription("Remove any gif by name")
		.addStringOption(option =>
			option.setName('name')
				.setDescription('Name of GIF')
				.setRequired(true)
		),
	async execute(interaction) {
		const modlog_perms = new Discord.MessageEmbed()
		const name = interaction.options.getString('name')
		const gif =  await Gif.findOne({guild_id: interaction.guild.id, gif_name: name})
		const gif_rem_embed = new Discord.MessageEmbed()
		.setColor('#00ff00')
		.setTitle(`**:white_check_mark: Removed General Channel**`)
		const gif_rem_db_fail = new Discord.MessageEmbed()
		.setColor('#FF0000')
		.setTitle(`**:x: DataBase Error!**`)
		.setDescription(`An error occurred while removing channel data from database!`)
		if (!interaction.member.permissions.has([ Permissions.FLAGS.MANAGE_CHANNELS , Permissions.FLAGS.MANAGE_MESSAGES , Permissions.FLAGS.MANAGE_ROLES , Permissions.FLAGS.ADMINISTRATOR ])) {
			interaction.reply("Only mods can use this command")
			return
		}
		if(!gif){
			interaction.reply('No gif found named ' + name)
			return
		}else{
			Gif.deleteOne({ guild_id: interaction.guild.id, gif_name: name }, (err, settings) => {
				if (err) {
					console.log(err)
					interaction.reply({embeds: [gif_rem_db_fail]})
					return
				}
				if (!settings) {
					interaction.reply('There is no gif to remove from this server!')
					return
				} 
				interaction.reply({embeds: [gif_rem_embed]})
			})
		}
	}
}