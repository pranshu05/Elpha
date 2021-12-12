const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js')

module.exports = {
	name: "guildCreate",
	async execute(guild) {

		const channel = guild.systemChannel
		const embed = new Discord.MessageEmbed()
			.setColor("00FFFF")
			.setTitle("Hello I am Elpha")
			.setDescription(`thanks for choosing me!`)
			.setTimestamp();

			channel.send({ embeds: [embed] })

        console.log(`Server joined: ${guild.name}`);
		
	}
}