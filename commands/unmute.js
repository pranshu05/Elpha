const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require('discord.js') 
const Modlog = require("../models/Modlog")
const Muted = require("../models/Muted")
module.exports = {
    data: new SlashCommandBuilder()
    .setName("unmute")
    .setDescription("unmute user")
    .addUserOption(option =>
        option.setName('user')
            .setDescription('user')
            .setRequired(true)
    ),
    async execute(interaction) {
        const user = interaction.options.getUser('user')
        const muteRole = interaction.guild.roles.cache.find(val => val.name === 'Mute')
        const modlog = await Modlog.findOne({guild_id: interaction.guild.id})
        if (interaction.guild.members.cache.get(interaction.user.id).permissions.has(Discord.Permissions.FLAGS.MANAGE_MESSAGES) || interaction.guild.members.cache.get(interaction.user.id).permissions.has(Discord.Permissions.FLAGS.ADMINISTRATOR) || interaction.user.id === '754381104034742415') {
        interaction.guild.members.fetch(user.id).then(member => {
            member.roles.remove(muteRole).catch(err => console.error(err))
        })
            const embed = new Discord.MessageEmbed()
            .setColor('#00ffff')
             .setTitle(`Unmuted ${user.username}`)
             .setDescription( `moderator: ${interaction.user.username}`)
             .setThumbnail(user.displayAvatarURL())
             interaction.reply({ embeds: [embed] })
             Muted.deleteOne({guild_id: interaction.guild.id}, (err, settings) => {
                if (err) {
                    console.log(err)
                    interaction.reply("An error occurred while adding data of unmuting user to database!")
                    return
                }
            })
             if (!modlog) {
                return
            }else{
                const abc = interaction.guild.channels.cache.get(modlog.modlog_channel_id)
                if(!abc)return
                if (abc.type === 'voice') return
                abc.send({
                    embeds: [embed] 
                })	
            }
        } else {
            interaction.reply('Insufficant Permissions')
        }
    }
}