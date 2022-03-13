const { SlashCommandBuilder } = require("@discordjs/builders")
const { Permissions} = require("discord.js")
const Gif = require("../models/Gif")
module.exports = {
	data: new SlashCommandBuilder()
		.setName("removegif")
		.setDescription("Remove any gif by name")
		.addStringOption(option =>
			option.setName('name')
				.setDescription('Name of GIF')
				.setRequired(true)
		),
	async execute(interaction) {
		const name = interaction.options.getString('name')
		const gif =  await Gif.find({guild_id: interaction.guild.id, gif_name: name})
		if (!interaction.member.permissions.has([ Permissions.FLAGS.MANAGE_CHANNELS , Permissions.FLAGS.MANAGE_MESSAGES , Permissions.FLAGS.MANAGE_ROLES , Permissions.FLAGS.ADMINISTRATOR ])) {
			interaction.reply("Only mods can use this command")
			return
		}
		if(!gif){
			interaction.reply('No gif found named ' + name)
			return
		}else{
			Gif.deleteOne({ guild_id: interaction.guild.id, gif_name: name }, (err, settings) => {
				if (err) {
					console.log(err)
					interaction.reply("An error occurred while trying to remove the gif!")
					return
				}
				if (!settings) {
					interaction.reply('There is no gif to remove from this server!')
					return
				} 
				interaction.reply(`Gif has been removed`)
			})
		}
	}
}