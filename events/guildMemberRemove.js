const Discord = require('discord.js');

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
		
			if(member.guild.id === "754381521854398595"){
				member.guild.channels.cache.get("862296895665340467").send({
					embeds: [newMemberEmbed] 
				})
			}
			
	}

}