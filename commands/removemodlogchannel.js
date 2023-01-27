const { SlashCommandBuilder } = require("@discordjs/builders")
const { Permissions} = require("discord.js")
const Modlog = require("../models/Modlog")
module.exports = {
	data: new SlashCommandBuilder()
		.setName("removemodlogchannel")
		.setDescription("Remove the modlog message channel"),
	async execute(interaction) {
		const ml_rem_embed = new Discord.MessageEmbed()
		.setColor('#00ff00')
		.setTitle(`**:white_check_mark: Removed Moglog Channel**`)
		const ml_rem_db_fail = new Discord.MessageEmbed()
		.setColor('#FF0000')
		.setTitle(`**:x: DataBase Error!**`)
		.setDescription(`An error occurred while removing channel data from database!`)
		if (!interaction.member.permissions.has([ Permissions.FLAGS.MANAGE_CHANNELS , Permissions.FLAGS.MANAGE_MESSAGES , Permissions.FLAGS.MANAGE_ROLES , Permissions.FLAGS.ADMINISTRATOR ])) {
			interaction.reply("You do not have permission to use this command!")
			return
		} 
		Modlog.deleteOne({ guild_id: interaction.guild.id }, (err, settings) => {
			if (err) {
				console.log(err)
				interaction.reply({embeds: [ml_rem_db_fail]})
				return
			}
			if (!settings) {
				interaction.reply({embeds: [ml_rem_db_fail]})
				return
			} 
			interaction.reply({embeds: [ml_rem_embed]})
		})
	}
}