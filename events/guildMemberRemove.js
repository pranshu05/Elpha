const Discord = require('discord.js')
const GuildSettings = require("../models/GuildSettings")

module.exports = {
	name: "guildMemberRemove",
	async execute(member) {

		console.log(member.user)
		const guildSettings = await GuildSettings.findOne({guild_id: member.guild.id})
		if (!guildSettings && !guildSettings.welcome_channel_id) {
			return
		}

		const newMemberEmbed = new Discord.MessageEmbed()
			.setColor("00FFFF")
			.setTitle("Member left")
			.setDescription(`${member.user} had left the srver`)
			.setThumbnail(member.user.displayAvatarURL())
			.setTimestamp()
		
			member.guild.channels.cache.get(guildSettings.welcome_channel_id).send({
				embeds: [newMemberEmbed] 
			})		
	}

}