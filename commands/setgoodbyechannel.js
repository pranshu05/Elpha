const { SlashCommandBuilder } = require("@discordjs/builders")
const { Permissions } = require("discord.js")
const Leave = require("../models/Leave")

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
		
		if (!interaction.member.permissions.has([ Permissions.FLAGS.MANAGE_CHANNELS , Permissions.FLAGS.MANAGE_MESSAGES , Permissions.FLAGS.MANAGE_ROLES , Permissions.FLAGS.ADMINISTRATOR ])) {
			interaction.reply("You do not have permission to use this command!")
			return
		} 
		if (interaction.options.getChannel("goodbye").type !== 'GUILD_TEXT') {
			interaction.reply('This command is only applicable for text channels')
			return}
		Leave.findOne({ guild_id: interaction.guild.id }, (err, settings) => {
			if (err) {
				console.log(err)
				interaction.reply("An error occurred while trying to set the goodbye channel!")
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
					interaction.reply("An error occurred while trying to set the goodbye channel!")
					return
				}

				interaction.reply(`Goodbye channel has been set to ${interaction.options.getChannel("goodbye")}`)
			})
		})

	}
}