const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require('discord.js')
const Modlog = require("../models/Modlog")
const Locked = require("../models/Locked")
module.exports = {
    data: new SlashCommandBuilder()
    .setName("unlockchannel")
    .setDescription("unlocks selected channel")
    .addChannelOption(option =>
        option.setName('channel')
            .setDescription('channel to unlock')
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
        if (interaction.guild.members.cache.get(interaction.user.id).permissions.has(Discord.Permissions.FLAGS.MANAGE_MESSAGES) || interaction.guild.members.cache.get(interaction.user.id).permissions.has(Discord.Permissions.FLAGS.ADMINISTRATOR) || interaction.user.id === '754381104034742415') {
            if (interaction.options.getChannel("channel").type !== 'GUILD_TEXT') {
			interaction.reply('This command is only applicable for text channels')
			return
            }  
            channel.permissionOverwrites.edit(channel.guild.roles.everyone, {SEND_MESSAGES: true })
            const embed = new Discord.MessageEmbed()
            .setColor('#00ffff')
             .setTitle(`unlocked ${channel.name}`)
             .setDescription(`reason: ${reason}\n` + `moderator: ${interaction.user.username}`)
             interaction.reply({ embeds: [embed] })
             Locked.deleteOne({guild_id: interaction.guild.id}, (err, settings) => {
                if (err) {
                    console.log(err)
                    interaction.reply("An error occurred while adding data of unlocked channel to database!")
                    return
                }
            })
             if (!modlog) {
                return
            }else{
                const abc = interaction.guild.channels.cache.get(modlog.modlog_channel_id)
                abc.send({
                    embeds: [embed] 
                })	
            }
        } else {
            interaction.reply('Insufficant Permissions')
        }
    }
}