const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require('discord.js')
const Kicked = require("../models/Kicked")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("kickeduser")
    .setDescription("sends kicked users"),

    async execute(interaction) {
        if (interaction.guild.members.cache.get(interaction.user.id).permissions.has(Discord.Permissions.FLAGS.MANAGE_MESSAGES) || interaction.guild.members.cache.get(interaction.user.id).permissions.has(Discord.Permissions.FLAGS.ADMINISTRATOR) || interaction.user.id === '754381104034742415') {
        const kicked =  await Kicked.find({guild_id: interaction.guild.id})
		if (!kicked) {
            interaction.reply(`There are no kicked users in the server`)
			return
		}else{
            const embedDescription = kicked.map((kick) => {
                const moderator = interaction.guild.members.cache.get(
                  kick.moderatorId
                )
              return [ 
                `Moderator: ${moderator}`,
                `User: ${kick.user_id}`,
                `Reason: ${kick.reason}`
              ].join('\n');
              })
              .join('\n\n')
			const Embed = new Discord.MessageEmbed()
			.setColor("00FFFF")
			.setTitle(`kicked users in ${interaction.guild.name}`)
			.setDescription(embedDescription)
			.setThumbnail(interaction.guild.iconURL())
			interaction.reply({
				embeds: [Embed] 
			})	
		  }
        } else{
            interaction.reply('Insufficant Permissions')
        }
    }
}
