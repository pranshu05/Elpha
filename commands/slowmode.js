const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require('discord.js') 
const Modlog = require("../models/Modlog")
module.exports = {
    data: new SlashCommandBuilder()
    .setName("slowmode")
    .setDescription("set slowmode of current channel")
    .addStringOption(option =>
        option.setName('time')
            .setDescription('slowmode time in seconds')
            .setRequired(true)
    ),
    async execute(interaction) {
        const time = interaction.options.getString('time')
        const modlog = await Modlog.findOne({guild_id: interaction.guild.id})
        if (interaction.guild.members.cache.get(interaction.user.id).permissions.has(Discord.Permissions.FLAGS.MANAGE_MESSAGES)) {
            if(!interaction.guild.me.permissions.has(Discord.Permissions.FLAGS.MANAGE_CHANNELS)){
                return interaction.reply(`I don't have permission to manage chanels!`)
            }
           interaction.channel.setRateLimitPerUser(time)
            const embed = new Discord.MessageEmbed()
            .setColor('#00ffff')
             .setTitle(`Slowmode for ${interaction.channel} is set for ${time} seconds`)
             interaction.reply({ embeds: [embed] })
             if (!modlog) {
                return
            }else{
                const abc = interaction.guild.channels.cache.get(modlog.modlog_channel_id)
                if(!interaction.guild.me.permissionsIn(abc).has(Discord.Permissions.FLAGS.SEND_MESSAGES)){
                    if(interaction.guild.me.permissionsIn(interaction.channel).has(Discord.Permissions.FLAGS.SEND_MESSAGES)){
                          interaction.channel.send(`I don't have permission to send message in modlogs channel`)
                          return 
                    }
                    return 
                }
                    abc.send({
                    embeds: [embed] 
                })
            }
        } else {
            interaction.reply('Insufficant Permissions')
        }
    }
}
