const { SlashCommandBuilder } = require("@discordjs/builders")
const { Permissions, Discord} = require("discord.js")
const Leave = require("../models/Leave")
const Modlog = require("../models/Modlog")
module.exports = {
	data: new SlashCommandBuilder()
		.setName("removegoodbyechannel")
		.setDescription("Remove the goodbye message channel"),
	async execute(interaction) {
		const gb_rem_embed = new Discord.MessageEmbed()
		.setColor('#00ff00')
		.setTitle(`**:white_check_mark: Removed GoodBye Channel**`)
		const gb_rem_db_fail = new Discord.MessageEmbed()
		.setColor('#FF0000')
		.setTitle(`**:x: DataBase Error!**`)
		.setDescription(`An error occurred while removing channel data from database!`)
		const modlog_perms = new Discord.MessageEmbed()
		.setColor('#FF0000')
		.setTitle(`**:x: Message Error!**`)
		.setDescription(`I don't have permission to send message in modlogs channel!`)
		const modlog = await Modlog.findOne({guild_id: interaction.guild.id})
		if (!interaction.member.permissions.has([ Permissions.FLAGS.MANAGE_CHANNELS , Permissions.FLAGS.MANAGE_MESSAGES , Permissions.FLAGS.MANAGE_ROLES , Permissions.FLAGS.ADMINISTRATOR ])) {
			interaction.reply("You do not have permission to use this command!")
			return
		} 
		Leave.deleteOne({ guild_id: interaction.guild.id }, (err, settings) => {
			if (err) {
				console.log(err)
				interaction.reply({embeds: [gb_rem_db_fail]})
				return
			}
			if (!settings) {
				interaction.reply({embeds: [gb_rem_db_fail]})
				return
			} 
				interaction.reply({embeds: [gb_rem_embed]})
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
						abc.send(`Goodbye chnnel has been removed by ${interaction.user}`)	
		}
	}
}