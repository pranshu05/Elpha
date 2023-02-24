const { SlashCommandBuilder } = require('@discordjs/builders')
const Discord = require('discord.js')
const ms = require('ms')

const Modlog = require('../models/Modlog')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('timeout')
        .setDescription('timeout a user')
        .addUserOption((option) =>
            option
                .setName('user')
                .setDescription('User to timeout')
                .setRequired(true)
        )
        .addStringOption((option) =>
            option
                .setName('duration')
                .setDescription('Provide duration in format : 1m,1h,1d')
                .setRequired(true)
        )
        .addStringOption((option) =>
            option.setName('reason').setDescription('reason').setRequired(true)
        ),
    async execute(interaction) {
        const reason = interaction.options.getString('reason')
        const duration = interaction.options.getString('duration')
        const user = interaction.options.getUser('user')
        const modlog = await Modlog.findOne({ guild_id: interaction.guild.id })
        const insf_perms = new Discord.MessageEmbed()
            .setColor('#FF0000')
            .setTitle(`**:x: Insufficient Permission!**`)
            .setDescription(`You don't have permission to use this command.`)
        const no_timeout_perms = new Discord.MessageEmbed()
            .setColor('#FF0000')
            .setTitle(`**:x: Couldn't timeout Member!**`)
            .setDescription(`I don't have permission to timeout users.`)
        const timeout_embed = new Discord.MessageEmbed()
            .setColor('#00ff00')
            .setTitle(`**:white_check_mark: Timed Out ${user.username}**`)
            .setDescription(
                `reason: ${reason}\n` +
                    `moderator: ${interaction.user.username}\n` +
                    `duration: ${duration}`
            )
            .setThumbnail(user.displayAvatarURL())
        const modlog_perms = new Discord.MessageEmbed()
            .setColor('#FF0000')
            .setTitle(`**:x: Message Error!**`)
            .setDescription(
                `I don't have permission to send message in modlogs channel!`
            )
        if (
            !interaction.guild.me.permissions.has(
                Discord.Permissions.FLAGS.MANAGE_MEMBERS
            )
        ) {
            return interaction.reply({ embeds: [no_timeout_perms] })
        }
        if (
            interaction.guild.members.cache
                .get(interaction.user.id)
                .permissions.has(Discord.Permissions.FLAGS.MANAGE_MEMBERS)
        ) {
            if (user === interaction.user)
                return interaction.reply('You cannot timeout yourself')
            if (user === interaction.client.user)
                return interaction.reply('You cannot timeout me')
            if (!ms(duration) || ms(duration) > ms('28d'))
                return interaction.reply(
                    'Provided duration is invalid or greater than 28days!'
                )
            if (
                interaction.guild.members.cache
                    .get(user.id)
                    .permissions.has(
                        Discord.Permissions.FLAGS.MANAGE_MESSAGES
                    ) ||
                interaction.guild.members.cache
                    .get(user.id)
                    .permissions.has(Discord.Permissions.FLAGS.ADMINISTRATOR)
            ) {
                return interaction.reply(
                    'You cannot timeout member with higher roles!'
                )
            }
            if (user.id === '754381104034742415')
                return interaction.reply('You cannot timeout my developer')
            interaction.guild.members.fetch(user.id).then((member) => {
                member.timeout(ms(duration)).catch((err) => console.error(err))
            })
            interaction.reply({ embeds: [timeout_embed] })
            if (!modlog) {
                return
            } else {
                const abc = interaction.guild.channels.cache.get(
                    modlog.modlog_channel_id
                )
                if (
                    !interaction.guild.me
                        .permissionsIn(abc)
                        .has(Discord.Permissions.FLAGS.SEND_MESSAGES)
                ) {
                    if (
                        interaction.guild.me
                            .permissionsIn(interaction.channel)
                            .has(Discord.Permissions.FLAGS.SEND_MESSAGES)
                    ) {
                        interaction.channel.send({ embeds: [modlog_perms] })
                        return
                    }
                    return
                }
                abc.send({ embeds: [timeout_embed] })
            }
            user.send(
                `You were timed out in ${interaction.guild.name} for duration: ${duration}`
            ).catch(console.error)
        } else {
            interaction.reply({ embeds: [insf_perms] })
        }
    },
}
