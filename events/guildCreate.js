const Discord = require('discord.js')
const { MessageActionRow, ButtonBuilder, ButtonStyle } = require('discord.js')
module.exports = {
	name: "guildCreate",
	async execute(guild,client) {
		const channel = guild.channels.cache.find(channel => channel.type === 'GUILD_TEXT' && channel.permissionsFor(guild.me).has('SEND_MESSAGES'))
		
		const row = new MessageActionRow()
			.addComponents(
					new MessageButton()
    				.setLabel('Github Repository')
    				.setURL("https://github.com/pranshu05/elpha")
    				.setStyle('LINK'),
);
		const embed = new Discord.MessageEmbed()
			.setColor("00FFFF")
			.setTitle("Hello I am Elpha,thanks for choosing me!")
			.setDescription(`**I'm an open-source discord bot! Developed by contributors.Contribute to my code to Make me more powerful 💪🏻**`)
			.addField('Setup instructions', '')
			.addField('Setup Welcome Channel', '**Use Slashcommand**\n  >\`\`\`/setwelcomechannel\`\`\`')
			.addField('Setup General Channel', '**Use Slashcommand**\n  >\`\`\`/setgeneralchannel\`\`\`')
			.addField('Setup Modlogs Channel', '**Use Slashcommand**\n  >\`\`\`/setmodlogchannel\`\`\`')
			.addField('Setup Goodbye Channel', '**Use Slashcommand**\n  >\`\`\`/setgoodbyechannel\`\`\`')
			.addField('Create Default Role', '**Use Slashcommand**\n  >\`\`\`/setdefaultrole\`\`\`')
			.setTimestamp()
			channel.send({ embeds: [embed], components: [row] }).catch((err) => console.log(err))
			console.log(`Server joined: ${guild.name}`)
	}
}
