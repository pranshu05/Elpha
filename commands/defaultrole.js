const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require('discord.js')
const Modlog = require("../models/Modlog")
const Role = require("../models/Role")
module.exports = {
    data: new SlashCommandBuilder()
    .setName("setdefaultrole")
    .setDescription("sets default role")
    .addStringOption(option =>
        option.setName('role')
            .setDescription('role')
            .setRequired(true)
    ),
    async execute(interaction, guild) {
        const role = interaction.options.getString('role')
        const modlog = await Modlog.findOne({guild_id: interaction.guild.id})
        if (interaction.guild.members.cache.get(interaction.user.id).permissions.has(Discord.Permissions.FLAGS.MANAGE_MESSAGES) || interaction.guild.members.cache.get(interaction.user.id).permissions.has(Discord.Permissions.FLAGS.ADMINISTRATOR) || interaction.user.id === '754381104034742415') {
            interaction.guild.roles.create({ name: role})
            const embed = new Discord.MessageEmbed()
            .setColor('#00ffff')
             .setTitle(`created default role`)
             .setDescription(`role: ${role}`)
             interaction.reply({ embeds: [embed] })
             Role.findOne({guild_id: interaction.guild.id}, (err, settings) => {
                if (err) {
                    console.log(err)
                    interaction.reply("An error occurred while adding role to database!")
                    return
                }if (!settings){
                    settings = new Role({
                        guild_id: interaction.guild.id,
                        role: interaction.options.getString('role'),
                    })
                }else {
                    settings.role = interaction.options.getString('role')
                } 
                settings.save(err => {
                    if (err) {
                        console.log(err)
                        interaction.reply("An error occurred while adding role to database!")
                        return
                    }
                })
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