module.exports = {
	name: 'guildDelete',
	async execute(guild, client) {
		if(guild.available){
			console.log(`Server left: ${guild.name}`)
			const embed = new MessageEmbed()
			.setColor('00FFFF')
			.setTitle('Guild Left')
			.setDescription(`Elpha has left the server ${guild.name}`)
			.addField('Members:' , `${guild.memberCount}`)
			.addField('Guild ID:' , `${guild.id}`)
			.addField('Guild owner:', `> <@${guild.ownerId}> \`[${guild.ownerId}]\``)
			.addField('Total servers:', `${client.guilds.cache.size}`)
			.setThumbnail(guild.iconURL())
			.setTimestamp()
			client.channels.cache.get('919799899929841694').send({embeds: [embed]})	
		}
	}
}