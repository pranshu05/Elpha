const Discord = require('discord.js')
const Leave = require("../models/Leave")
module.exports = {
	name: "guildMemberRemove",
	async execute(member , guild) {
		console.log(member.user)
		const guildSettings = await Leave.findOne({guild_id: member.guild.id})
		if (!guildSettings) {
			return
		}else{
				const newMemberEmbed = new Discord.MessageEmbed()
			.setColor("00FFFF")
			.setTitle("Member left")
			.setDescription(`${member.user} left the srver`)
			.setThumbnail(member.user.displayAvatarURL())
			.setTimestamp()
			member.guild.channels.cache.get(guildSettings.goodbye_channel_id).send({
				embeds: [newMemberEmbed] 
			})	
		}			
	}
}