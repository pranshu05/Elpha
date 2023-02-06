const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require('discord.js')
const Modlog = require("../../models/Modlog")
const Locked = require("../../models/Locked")
module.exports = {
    data: new SlashCommandBuilder()
    .setName("lockchannel")
    .setDescription("locks selected channel")
    .addChannelOption(option =>
        option.setName('channel')
            .setDescription('channel to lock')
            .setRequired(true)
    )
    .addStringOption(option =>
        option.setName('reason')
            .setDescription('reason')
            .setRequired(true)
    ),
    async execute(interaction) {
        const reason = interaction.options.getString('reason')
        const channel = interaction.options.getChannel('channel')
        const modlog = await Modlog.findOne({guild_id: interaction.guild.id})
        const insf_perms = new Discord.MessageEmbed()
        .setColor('#FF0000')
	    .setTitle(`**:x: Insufficient Permission!**`)
        .setDescription(`You don't have permission to use this command.`)
        const no_channel_perms = new Discord.MessageEmbed()
        .setColor('#FF0000')
	    .setTitle(`**:x: Couldn't Lock the Channel!**`)
        .setDescription(`I don't have permission to manage channels.`)
        const invalid_channel = new Discord.MessageEmbed()
        .setColor('#FF0000')
	    .setTitle(`**:x: Invalid Channel**`)
        .setDescription(`This command is only applicable for text channels`)
        const locked_embed = new Discord.MessageEmbed()
         .setColor('#00ff00')
         .setTitle(`**:white_check_mark: Locked ${channel.name}**`)
         .setDescription(`reason: ${reason}\n` + `moderator: ${interaction.user.username}`)
        const lock_db_fail = new Discord.MessageEmbed()
        .setColor('#FF0000')
	    .setTitle(`**:x: DataBase Error!**`)
        .setDescription(`An error occurred while adding locked channel to database!`)
        const modlog_perms = new Discord.MessageEmbed()
        .setColor('#FF0000')
	    .setTitle(`**:x: Message Error!**`)
        .setDescription(`I don't have permission to send message in modlogs channel!`)
        if (interaction.guild.members.cache.get(interaction.user.id).permissions.has(Discord.Permissions.FLAGS.MANAGE_CHANNELS)) {
            if(!interaction.guild.me.permissions.has(Discord.Permissions.FLAGS.MANAGE_CHANNELS)){
                return interaction.reply({embeds: [no_channel_perms]})
            }
            if (interaction.options.getChannel("channel").type !== 'GUILD_TEXT') {
			interaction.reply({embeds: [invalid_channel]})
			return
            } 
            channel.permissionOverwrites.edit(channel.guild.roles.everyone, {SEND_MESSAGES: false })
             interaction.reply({ embeds: [locked_embed] })
             Locked.findOne({guild_id: interaction.guild.id}, (err, settings) => {
                if (err) {
                    console.log(err)
                    interaction.reply({embeds: [lock_db_fail]})
                    return
                }else {
                    settings = new Locked({
                        guild_id: interaction.guild.id,
                        channelname: channel.name,
                        moderatorId: interaction.user.id,
                        reason: interaction.options.getString('reason'),
                    })
                } 
                settings.save(err => {
                    if (err) {
                        console.log(err)
                        interaction.reply({embeds: [lock_db_fail]})
                        return
                    }
                })
            })
             if (!modlog) {
                return
            }else{
                const abc = interaction.guild.channels.cache.get(modlog.modlog_channel_id)
                    if(!interaction.guild.me.permissionsIn(abc).has(Discord.Permissions.FLAGS.SEND_MESSAGES)){
                        if(interaction.guild.me.permissionsIn(interaction.channel).has(Discord.Permissions.FLAGS.SEND_MESSAGES)){
                              interaction.channel.send({embeds: [modlog_perms]})
                              return 
                        }
                        return 
                    }
                    abc.send({
                        embeds: [locked_embed] 
                    })		
            }
        } else {
            interaction.reply({embeds: [insf_perms]})
        }
    }
}