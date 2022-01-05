const { SlashCommandBuilder } = require("@discordjs/builders")
const { Permissions , Discord } = require("discord.js")
const Leave = require("../models/Leave")
const Modlog = require("../models/Modlog")
module.exports = {
	data: new SlashCommandBuilder()
		.setName("removegoodbyechannel")
		.setDescription("Remove the goodbye message channel"),
	async execute(interaction) {
		const modlog = await Modlog.findOne({guild_id: interaction.guild.id})
		if (!interaction.member.permissions.has([ Permissions.FLAGS.MANAGE_CHANNELS , Permissions.FLAGS.MANAGE_MESSAGES , Permissions.FLAGS.MANAGE_ROLES , Permissions.FLAGS.ADMINISTRATOR ])) {
			interaction.reply("You do not have permission to use this command!")
			return
		} 
		Leave.deleteOne({ guild_id: interaction.guild.id }, (err, settings) => {
			if (err) {
				console.log(err)
				interaction.reply("An error occurred while trying to remove the goodbye channel!")
				return
			}
			if (!settings) {
				interaction.reply('There is no goodbye channel to remove from this server!')
				return
			} 
				interaction.reply(`Goodbye channel has been removed`)
		})
		if (!modlog) {
			return
		}else{
			const abc = interaction.guild.channels.cache.get(modlog.modlog_channel_id)
			abc.send(`Goodbye chnnel has been removed by ${interaction.user}`)	
		}
	}
}