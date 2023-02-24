const { SlashCommandBuilder } = require('@discordjs/builders')
const Discord = require('discord.js')

const Modlog = require('../models/Modlog')
const Muted = require('../models/Muted')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('mute')
        .setDescription('mute user')
        .addUserOption((option) =>
            option
                .setName('user')
                .setDescription('User to mute')
                .setRequired(true)
        )
        .addStringOption((option) =>
            option
                .setName('reason')
                .setDescription('Reason for mute')
                .setRequired(true)
        ),
    async execute(interaction) {
        const reason = interaction.options.getString('reason')
        const user = interaction.options.getUser('user')
        const muteRole = interaction.guild.roles.cache.find(
            (val) => val.name === 'Mute'
        )
        const modlog = await Modlog.findOne({ guild_id: interaction.guild.id })
        const insf_perms = new Discord.MessageEmbed()
            .setColor('#FF0000')
            .setTitle(`**:x: Insufficient Permission!**`)
            .setDescription(`You don't have permission to use this command.`)
        const no_mute_perms = new Discord.MessageEmbed()
            .setColor('#FF0000')
            .setTitle(`**:x: Couldn't Mute Member!**`)
            .setDescription(`I don't have permission to manage roles.`)
        const mute_embed = new Discord.MessageEmbed()
            .setColor('#00ffff')
            .setImage(
                'https://c.tenor.com/-W6BYcctNnsAAAAM/shut-up-shush.gif',
                true
            )
            .setTitle(`Muted ${user.username}`)
            .setDescription(
                `reason: ${reason}\n` +
                    `moderator: ${interaction.user.username}`
            )
            .setThumbnail(user.displayAvatarURL())
        const mute_db_fail = new Discord.MessageEmbed()
            .setColor('#FF0000')
            .setTitle(`**:x: DataBase Error!**`)
            .setDescription(
                `An error occurred while adding muted user to database!`
            )
        const modlog_perms = new Discord.MessageEmbed()
            .setColor('#FF0000')
            .setTitle(`**:x: Message Error!**`)
            .setDescription(
                `I don't have permission to send message in modlogs channel!`
            )
        if (
            !interaction.guild.me.permissions.has(
                Discord.Permissions.FLAGS.MANAGE_ROLES
            )
        ) {
            return interaction.reply({ embeds: [no_mute_perms] })
        }
        if (
            interaction.guild.members.cache
                .get(interaction.user.id)
                .permissions.has(Discord.Permissions.FLAGS.MANAGE_MESSAGES)
        ) {
            if (!muteRole)
                return interaction.reply('Please make a role named **Mute**')
            if (user === interaction.user)
                return interaction.reply('You cannot mute yourself')
            if (user === interaction.client.user)
                return interaction.reply('You cannot mute me')
            if (!muteRole.editable)
                return interaction.reply(
                    'I cannot mute the member because the `Mute role` is above me or you!'
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
                    'You cannot mute member with higher roles!'
                )
            }
            if (user.id === '754381104034742415')
                return interaction.reply('You cannot mute my developer')
            interaction.guild.members.fetch(user.id).then((member) => {
                member.roles.add(muteRole).catch((err) => console.error(err))
            })
            interaction.reply({ embeds: [mute_embed] })
            Muted.findOne(
                { guild_id: interaction.guild.id },
                (err, settings) => {
                    if (err) {
                        console.log(err)
                        interaction.reply({ embeds: [mute_db_fail] })
                        return
                    } else {
                        settings = new Muted({
                            guild_id: interaction.guild.id,
                            user_id: user.id,
                            moderatorId: interaction.user.id,
                            reason: interaction.options.getString('reason'),
                        })
                    }
                    settings.save((err) => {
                        if (err) {
                            console.log(err)
                            interaction.reply({ embeds: [mute_db_fail] })
                            return
                        }
                    })
                }
            )
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
                abc.send({ embeds: [mute_embed] })
            }
            user.send(`You were muted in ${interaction.guild.name}`).catch(
                console.error
            )
        } else {
            interaction.reply({ embeds: [insf_perms] })
        }
    },
}
