const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require('discord.js')
const Locked = require("../models/Locked")
module.exports = {
    data: new SlashCommandBuilder()
    .setName("lockedchannel")
    .setDescription("sends locked channels"),
    async execute(interaction) {
        if (interaction.guild.members.cache.get(interaction.user.id).permissions.has(Discord.Permissions.FLAGS.MANAGE_MESSAGES) || interaction.guild.members.cache.get(interaction.user.id).permissions.has(Discord.Permissions.FLAGS.ADMINISTRATOR) || interaction.user.id === '754381104034742415') {
        const locked =  await Locked.find({guild_id: interaction.guild.id})
		if (!locked) {
        interaction.reply(`There are no locked channels in the server`)
		return
		}else{
            const embedDescription = locked.map((lock) => {
            const moderator = interaction.guild.members.cache.get(
            lock.moderatorId
            )
              return [ 
                `Moderator: ${moderator}`,
                `channel: ${lock.channelname}`,
                `Reason: ${lock.reason}`
              ].join('\n');
              })
              .join('\n\n')
			const Embed = new Discord.MessageEmbed()
			.setColor("00FFFF")
			.setTitle(`locked channels in ${interaction.guild.name}`)
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
