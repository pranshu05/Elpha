const { MessageEmbed } = require('discord.js')
const Discord = require('discord.js')


module.exports = {
	name: "guildCreate",
	async execute(guild) {

	
		const abc = guild.systemChannel
		const embed = new Discord.MessageEmbed()
			.setColor("00FFFF")
			.setTitle("Hello I am Elpha")
			.addField('Setup instructions', '1) Setup the welcome channel by `/setwelcomechannel` command! \n' + '2) Setup the general channel by `/setgeneralchannel` command!\n' + '3) Setup the modlog channel by `/setmodlogchannel` command')
			.setDescription(`thanks for choosing me!`)
			.setTimestamp()

			abc.send({ embeds: [embed] })
	}
}