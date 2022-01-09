const { SlashCommandBuilder } = require("@discordjs/builders")
const { Permissions , Discord} = require("discord.js")
const Modlog = require("../models/Modlog")
module.exports = {
	data: new SlashCommandBuilder()
		.setName("setmodlogchannel")
		.setDescription("Set the modlog message channel")
		.addChannelOption(option => option
			.setName("modlog")
			.setDescription("The channel to set as the modlog channel")
			.setRequired(true)
		),
	async execute(interaction) {
		const modlog = await Modlog.findOne({guild_id: interaction.guild.id})
		if (!interaction.member.permissions.has([ Permissions.FLAGS.MANAGE_CHANNELS , Permissions.FLAGS.MANAGE_MESSAGES , Permissions.FLAGS.MANAGE_ROLES , Permissions.FLAGS.ADMINISTRATOR ])) {
			interaction.reply("You do not have permission to use this command!")
			return
		} 
		Modlog.findOne({ guild_id: interaction.guild.id }, (err, settings) => {
			if (err) {
				console.log(err)
				interaction.reply("An error occurred while trying to set the modlog channel!")
				return
			}
			if (interaction.options.getChannel("modlog").type !== 'GUILD_TEXT') {
				interaction.reply('This command is only applicable for text channels')
				return}
			if (!settings) {
				settings = new Modlog({
					guild_id: interaction.guild.id,
					modlog_channel_id: interaction.options.getChannel("modlog").id
				})
			} else {
				settings.modlog_channel_id = interaction.options.getChannel("modlog").id
			}
			settings.save(err => {
				if (err) {
					console.log(err)
					interaction.reply("An error occurred while trying to set the modlog channel!")
					return
				}
				interaction.reply(`Modlog channel has been set to ${interaction.options.getChannel("modlog")}`)
				interaction.channel.send("You can undo this by `/removemodlogchannel` command")
			})
			if (!modlog) {
				return
			}else{
				const abc = interaction.guild.channels.cache.get(modlog.modlog_channel_id)
				abc.send(`Modlog chnnel has been set to ${interaction.options.getChannel("modlog")} by ${interaction.user}`)	
			}
		})
	}
}