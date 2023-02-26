const { SlashCommandBuilder } = require('@discordjs/builders')
const Discord = require('discord.js')
const Banned = require('../models/Banned')
module.exports = {
    data: new SlashCommandBuilder()
    .setName('banneduser')
    .setDescription('sends banned users'),
    async execute(interaction) {
        const insf_perms = new Discord.MessageEmbed()
        .setColor('#FF0000')
	    .setTitle(`**:x: Insufficient Permission!**`)
        .setDescription(`You don't have permission to use this command.`)
        if(interaction.guild.members.cache.get(interaction.user.id).permissions.has(Discord.Permissions.FLAGS.MANAGE_MESSAGES) || interaction.guild.members.cache.get(interaction.user.id).permissions.has(Discord.Permissions.FLAGS.ADMINISTRATOR) || interaction.user.id === '754381104034742415'){
            const banned =  await Banned.find({guild_id: interaction.guild.id})
		    if(banned.length === 0){
                interaction.reply(`There are no banned users in the server`)
                return 
		    }else{
                const embedDescription = banned.map((ban) => {
                const moderator = interaction.guild.members.cache.get(ban.moderatorId)
                return [ 
                  `Moderator: ${moderator}`,
                  `User: <@${ban.user_id}>`,
                  `Reason: ${ban.reason}`,
                ].join('\n');
                }).join('\n\n')
			    const Embed = new Discord.MessageEmbed()
			    .setColor("00FFFF")
		        .setTitle(`banned users in ${interaction.guild.name}`)
	            .setDescription(embedDescription)
	            .setThumbnail(interaction.guild.iconURL())
    	        interaction.reply({embeds: [Embed]})
            }	
		}else{
            interaction.reply({embeds: [insf_perms]})
        }
    }
}
