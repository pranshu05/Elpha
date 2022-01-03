const Discord = require('discord.js')
module.exports = {
	name: "guildCreate",
	async execute(guild,client) {
		const channel = guild.channels.cache.find(channel => channel.type === 'GUILD_TEXT' && channel.permissionsFor(guild.me).has('SEND_MESSAGES'))
		const embed = new Discord.MessageEmbed()
			.setColor("00FFFF")
			.setTitle("Hello I am Elpha")
			.addField('Setup instructions', '1) Setup the welcome channel by `/setwelcomechannel` command! \n' + '2) Setup the general channel by `/setgeneralchannel` command!\n' + '3) Setup the modlog channel by `/setmodlogchannel` command\n' + '4) Setup the goodbye channel by `/setgoodbyechannel` command! \n')
			.setDescription(`thanks for choosing me!`)
			.setTimestamp()
			channel.send({ embeds: [embed] })
			console.log(`Server joined: ${guild.name}`)
	}
}