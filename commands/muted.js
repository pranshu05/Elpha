const { SlashCommandBuilder } = require('@discordjs/builders')
const Discord = require('discord.js')

const Muted = require('../models/Muted')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('muteduser')
        .setDescription('sends muted users'),
    async execute(interaction) {
        const insf_perms = new Discord.MessageEmbed()
            .setColor('#FF0000')
            .setTitle(`**:x: Insufficient Permission!**`)
            .setDescription(`You don't have permission to use this command.`)
        if (
            interaction.guild.members.cache
                .get(interaction.user.id)
                .permissions.has(Discord.Permissions.FLAGS.MANAGE_MESSAGES) ||
            interaction.guild.members.cache
                .get(interaction.user.id)
                .permissions.has(Discord.Permissions.FLAGS.ADMINISTRATOR) ||
            interaction.user.id === '754381104034742415'
        ) {
            const muted = await Muted.find({ guild_id: interaction.guild.id })
            if (muted.length === 0) {
                interaction.reply(`There are no muted users in the server`)
                return
            } else {
                const embedDescription = muted
                    .map((mute) => {
                        const moderator = interaction.guild.members.cache.get(
                            mute.moderatorId
                        )
                        return [
                            `Moderator: ${moderator}`,
                            `User: <@${mute.user_id}>`,
                            `Reason: ${mute.reason}`,
                        ].join('\n')
                    })
                    .join('\n\n')
                const Embed = new Discord.MessageEmbed()
                    .setColor('00FFFF')
                    .setTitle(`muted users in ${interaction.guild.name}`)
                    .setDescription(embedDescription)
                    .setThumbnail(interaction.guild.iconURL())
                interaction.reply({ embeds: [Embed] })
            }
        } else {
            interaction.reply({ embeds: [insf_perms] })
        }
    },
}
