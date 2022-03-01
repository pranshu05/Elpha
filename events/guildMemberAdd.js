const Discord = require('discord.js')
const GuildSettings = require("../models/GuildSettings")
const Role = require("../models/Role")
module.exports = {
	name: "guildMemberAdd",
	async execute(member , guild) {
		console.log(`${member.user.username} joined ${member.guild.name}`)
		const roles = await Role.findOne({guild_id: member.guild.id})
		const guildSettings = await GuildSettings.findOne({guild_id: member.guild.id})
		if (!guildSettings) {
			return
		}else{ 
			if(!guildSettings.welcome_channel_id) return
			const newMemberEmbed = new Discord.MessageEmbed()
			.setColor("00FFFF")
			.setTitle("New Member!")
			.setDescription(`${member.user} has joined the server! We hope you enjoy your stay!`)
			.setThumbnail(member.user.displayAvatarURL())
			.setTimestamp()
			.setFooter(`membercount : ${member.guild.members.cache.filter(member => !member.user.bot).size}`)
			member.guild.channels.cache.get(guildSettings.welcome_channel_id).send({
				embeds: [newMemberEmbed] 
			})	
		}
		if(!roles){
			return
		}else{
			if(member.user.bot) return
			const role = member.guild.roles.cache.find(x => x.name == roles.role)
			if(!role){
				return
			}else{
				member.roles.add(role)
			}
		}
	}
}