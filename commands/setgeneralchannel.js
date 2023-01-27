const { SlashCommandBuilder } = require("@discordjs/builders")
const { Permissions, DiscordAPIError } = require("discord.js")
const General = require("../models/General")
const Modlog = require("../models/Modlog")
module.exports = {
	data: new SlashCommandBuilder()
		.setName("setgeneralchannel")
		.setDescription("Set the general message channel")
		.addChannelOption(option => option
			.setName("general")
			.setDescription("The channel to set as the general channel")
			.setRequired(true)
		),
	async execute(interaction) {
		const invalid_channel = new Discord.MessageEmbed()
        .setColor('#FF0000')
	    .setTitle(`**:x: Invalid Channel**`)
        .setDescription(`This command is only applicable for text channels`)
		const gen_embed = new Discord.MessageEmbed()
		.setColor('#00ff00')
		.setTitle(`**:white_check_mark: General channel has been set to ${interaction.options.getChannel("general")}**`)
		const gen_db_fail = new Discord.MessageEmbed()
		.setColor('#FF0000')
		.setTitle(`**:x: DataBase Error!**`)
		.setDescription(`An error occurred while adding channel data to database!`)
		const modlog_perms = new Discord.MessageEmbed()
		.setColor('#FF0000')
		.setTitle(`**:x: Message Error!**`)
		.setDescription(`I don't have permission to send message in modlogs channel!`)
		const modlog = await Modlog.findOne({guild_id: interaction.guild.id})
		if (!interaction.member.permissions.has([ Permissions.FLAGS.MANAGE_CHANNELS ])) {
			interaction.reply("You do not have permission to use this command!")
			return
		} 
		if (interaction.options.getChannel("general").type !== 'GUILD_TEXT') {
			interaction.reply({embeds: [invalid_channel]})
			return}
		General.findOne({ guild_id: interaction.guild.id }, (err, settings) => {
			if (err) {
				console.log(err)
				interaction.reply({embeds: [gen_db_fail]})
				return
			}
			if (!settings) {
				settings = new General({
					guild_id: interaction.guild.id,
					general_channel_id: interaction.options.getChannel("general").id
				})
			} else {
				settings.general_channel_id = interaction.options.getChannel("general").id
			}
			settings.save(err => {
				if (err) {
					console.log(err)
					interaction.reply({embeds: [gen_db_fail]})
					return
				}
				interaction.reply({embeds: [gen_embed]})
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
					abc.send({embeds : [gen_embed]})	
			}
		})
	}
}