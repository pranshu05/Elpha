const { MessageEmbed } = require('discord.js')
const Discord = require('discord.js')


module.exports = {
	name: "guildCreate",
	async execute(guild) {

	
		const abc = guild.systemChannel
		const embed = new Discord.MessageEmbed()
			.setColor("00FFFF")
			.setTitle("Hello I am Elpha")
			.setDescription(`thanks for choosing me! And please dont forget to set the welcome-channel by `/setwelcomechannel`command`)
			.setTimestamp()

			abc.send({ embeds: [embed] })
	}
}