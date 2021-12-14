const Discord = require('discord.js')

module.exports = {
	name: "guildCreate",
	async execute(guild) {

		const abc = guild.systemChannel
		const embed = new Discord.MessageEmbed()
			.setColor("00FFFF")
			.setTitle("Hello I am Elpha")
			.setDescription(`thanks for choosing me!`)
			.setTimestamp()

			abc.send({ embeds: [embed] })

        console.log(`Server joined: ${guild.name}`)

		
		
	}
}