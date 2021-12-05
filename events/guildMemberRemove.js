module.exports = {
	name: "guildMemberRemove",
	async execute(member) {

		console.log(member.user);

		const newMemberEmbed = new Discord.MessageEmbed()
			.setColor("00FFFF")
			.setTitle("Member left")
			.setDescription(`${member.user} had left the srver`)
			.setThumbnail(member.user.displayAvatarURL())
			.setTimestamp();
		
			member.guild.channels.cache.get("862296895665340467").send({
				embeds: [newMemberEmbed] 
			})
	}

}