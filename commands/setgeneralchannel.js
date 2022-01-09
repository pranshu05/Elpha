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
		const modlog = await Modlog.findOne({guild_id: interaction.guild.id})
		if (!interaction.member.permissions.has([ Permissions.FLAGS.MANAGE_CHANNELS , Permissions.FLAGS.MANAGE_MESSAGES , Permissions.FLAGS.MANAGE_ROLES , Permissions.FLAGS.ADMINISTRATOR ])) {
			interaction.reply("You do not have permission to use this command!")
			return
		} 
		if (interaction.options.getChannel("general").type !== 'GUILD_TEXT') {
			interaction.reply('This command is only applicable for text channels')
			return}
		General.findOne({ guild_id: interaction.guild.id }, (err, settings) => {
			if (err) {
				console.log(err)
				interaction.reply("An error occurred while trying to set the general channel!")
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
					interaction.reply("An error occurred while trying to set the general channel!")
					return
				}
				interaction.reply(`General channel has been set to ${interaction.options.getChannel("general")}`)
				interaction.channel.send("You can undo this by `/removegeneralchannel` command")
			
			})
			if (!modlog) {
				return
			}else{
				const abc = interaction.guild.channels.cache.get(modlog.modlog_channel_id)
				abc.send(`General chnnel has been set to ${interaction.options.getChannel("general")} by ${interaction.user}`)	
			}
		})
	}
}