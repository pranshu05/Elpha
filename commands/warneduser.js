const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require('discord.js')
const Warned = require("../models/Warned")
module.exports = {
    data: new SlashCommandBuilder()
    .setName("warneduser")
    .setDescription("sends warned users"),
    async execute(interaction) {
        if (interaction.guild.members.cache.get(interaction.user.id).permissions.has(Discord.Permissions.FLAGS.MANAGE_MESSAGES) || interaction.guild.members.cache.get(interaction.user.id).permissions.has(Discord.Permissions.FLAGS.ADMINISTRATOR) || interaction.user.id === '754381104034742415') {
        const warned =  await Warned.find({guild_id: interaction.guild.id})
		if (!warned) {
            interaction.reply(`There are no warned users in the server`)
			return
		}else{
            const embedDescription = warned.map((warna) => {
            const moderator = interaction.guild.members.cache.get(
            warna.moderatorId
            )
              return [ 
                `Moderator: ${moderator}`,
                `User: ${warna.user_id}`,
                `warning: ${warna.warning}`
              ].join('\n');
              })
              .join('\n\n')
			const Embed = new Discord.MessageEmbed()
			.setColor("00FFFF")
			.setTitle(`warned users in ${interaction.guild.name}`)
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
