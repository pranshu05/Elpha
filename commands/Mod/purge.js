const { SlashCommandBuilder } = require('@discordjs/builders')
const Discord = require('discord.js')
const Modlog = require("../../models/Modlog")
module.exports = {
    data: new SlashCommandBuilder()
        .setName('purge')
        .setDescription('Purge some messages')
        .addIntegerOption(option =>
            option.setName('messages')
                .setDescription('Number of messages to purge')
                .setRequired(true)
        ),
    async execute(interaction) {
        const modlog = await Modlog.findOne({guild_id: interaction.guild.id})
        const args = interaction.options.getInteger('messages')
        const insf_perms = new Discord.MessageEmbed()
        .setColor('#FF0000')
	    .setTitle(`**:x: Insufficient Permission!**`)
        .setDescription(`You don't have permission to use this command.`)
        const no_purge_perms = new Discord.MessageEmbed()
        .setColor('#FF0000')
	    .setTitle(`**:x: Couldn't Purge Messages**`)
        .setDescription(`I don't have permission to manage messages.`)
        const modlog_perms = new Discord.MessageEmbed()
        .setColor('#FF0000')
	    .setTitle(`**:x: Message Error!**`)
        .setDescription(`I don't have permission to send message in modlogs channel!`)
        if(!interaction.guild.me.permissions.has(Discord.Permissions.FLAGS.MANAGE_MESSAGES)){
            return interaction.reply({embeds: [no_purge_perms]})
        }
        if (interaction.guild.members.cache.get(interaction.user.id).permissions.has(Discord.Permissions.FLAGS.MANAGE_MESSAGES)) {
            interaction.channel.bulkDelete(args).catch(() => interaction.reply('Bots can only purge messages that are less than 14 days old. This error could be caused by DiscordAPI Overload'))
            interaction.reply({ content: 'Done!', ephemeral: true })
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
                    abc.send(`${interaction.options.getInteger('messages')} messages deleted by ${interaction.user} in ${interaction.channel}`)		
            }
        } else {
            interaction.reply({embeds: [insf_perms]})
        }
    }
}