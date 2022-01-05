const { SlashCommandBuilder } = require("@discordjs/builders")
const { Permissions , Discord } = require("discord.js")
const GuildSettings = require("../models/GuildSettings")
const Modlog = require("../models/Modlog")

module.exports = {
	data: new SlashCommandBuilder()
		.setName("setwelcomechannel")
		.setDescription("Set the welcome message channel")
		.addChannelOption(option => option
			.setName("welcome")
			.setDescription("The channel to set as the welcome channel")
			.setRequired(true)
		),
	async execute(interaction) {
		const modlog = await Modlog.findOne({guild_id: interaction.guild.id})

		if (!interaction.member.permissions.has([ Permissions.FLAGS.MANAGE_CHANNELS , Permissions.FLAGS.MANAGE_MESSAGES , Permissions.FLAGS.MANAGE_ROLES , Permissions.FLAGS.ADMINISTRATOR ])) {
			interaction.reply("You do not have permission to use this command!")
			return
		} 
		if (interaction.options.getChannel("welcome").type !== 'GUILD_TEXT') {
			interaction.reply('This command is only applicable for text channels')
			return}
		GuildSettings.findOne({ guild_id: interaction.guild.id }, (err, settings) => {
			if (err) {
				console.log(err)
				interaction.reply("An error occurred while trying to set the welcome channel!")
				return
			}

			if (!settings) {
				settings = new GuildSettings({
					guild_id: interaction.guild.id,
					welcome_channel_id: interaction.options.getChannel("welcome").id
				})
			} else {
				settings.welcome_channel_id = interaction.options.getChannel("welcome").id
			}

			settings.save(err => {
				if (err) {
					console.log(err)
					interaction.reply("An error occurred while trying to set the welcome channel!")
					return
				}

				interaction.reply(`Welcome channel has been set to ${interaction.options.getChannel("welcome")}`)
				interaction.channel.send("You can undo this by `/removewelcomechannel` command")
			})
			if (!modlog) {
				return
			}else{
				const abc = interaction.guild.channels.cache.get(modlog.modlog_channel_id)
				abc.send(`Welcome chnnel has been set to ${interaction.options.getChannel("general")} by ${interaction.user}`)	
			}
		})

	}
}