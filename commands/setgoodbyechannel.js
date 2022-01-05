const { SlashCommandBuilder } = require("@discordjs/builders")
const { Permissions, Discord } = require("discord.js")
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
		const modlog = await Modlog.findOne({guild_id: interaction.guild.id})

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
				interaction.channel.send("You can undo this by `/removegoodbyechannel` command")
			})
			if (!modlog) {
				return
			}else{
				const abc = interaction.guild.channels.cache.get(modlog.modlog_channel_id)
				abc.send(`Goodbye chnnel has been set to ${interaction.options.getChannel("general")} by ${interaction.user}`)	
			}
		})

	}
}