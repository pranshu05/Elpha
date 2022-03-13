const { SlashCommandBuilder } = require("@discordjs/builders")
const { Permissions} = require("discord.js")
const Modlog = require("../models/Modlog")
module.exports = {
	data: new SlashCommandBuilder()
		.setName("removemodlogchannel")
		.setDescription("Remove the modlog message channel"),
	async execute(interaction) {
		
		if (!interaction.member.permissions.has([ Permissions.FLAGS.MANAGE_CHANNELS , Permissions.FLAGS.MANAGE_MESSAGES , Permissions.FLAGS.MANAGE_ROLES , Permissions.FLAGS.ADMINISTRATOR ])) {
			interaction.reply("You do not have permission to use this command!")
			return
		} 
		Modlog.deleteOne({ guild_id: interaction.guild.id }, (err, settings) => {
			if (err) {
				console.log(err)
				interaction.reply("An error occurred while trying to remove the modlog channel!")
				return
			}
			if (!settings) {
				interaction.reply('There is no modlog channel to remove from this server!')
				return
			} 
			interaction.reply(`modlog channel has been removed`)
		})
	}
}