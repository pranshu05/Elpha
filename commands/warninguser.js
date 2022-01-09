const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require('discord.js')
const Warning = require("../models/Warning")
module.exports = {
    data: new SlashCommandBuilder()
    .setName("userwarning")
    .setDescription("sends user's warning")
    .addUserOption(option =>
        option.setName('user')
            .setDescription('user id')
            .setRequired(true)
    ),
    async execute(interaction) {
        if (interaction.guild.members.cache.get(interaction.user.id).permissions.has(Discord.Permissions.FLAGS.MANAGE_MESSAGES) || interaction.guild.members.cache.get(interaction.user.id).permissions.has(Discord.Permissions.FLAGS.ADMINISTRATOR) || interaction.user.id === '754381104034742415') {
        const user = interaction.options.getUser('user')
        const warninga =  await Warning.find({user_id: user.id , guild_id: interaction.guild.id})
		if (!warninga) {
            interaction.reply(`${user.username} do not have any warnings`)
			return
		}else{
            const embedDescription = warninga.map((warn) => {
                const moderator = interaction.guild.members.cache.get(
                  warn.moderatorId
                )
              return [ 
                `Moderator: ${moderator}`,
                `Warning: ${warn.warning}`
              ].join('\n');
              })
              .join('\n\n')
			const Embed = new Discord.MessageEmbed()
			.setColor("00FFFF")
			.setTitle(`${user.username}'s warnings`)
			.setDescription(embedDescription)
			.setThumbnail(user.displayAvatarURL())
			interaction.reply({
				embeds: [Embed] 
			})	
		  }
        } else{
            interaction.reply('Insufficant Permissions')
        }
    }
}
