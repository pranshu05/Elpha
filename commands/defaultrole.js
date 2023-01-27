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
        const no_role_perms = new Discord.MessageEmbed()
        .setColor('#FF0000')
	    .setTitle(`**:x: Couldn't create the role!**`)
        .setDescription(`I don't have permission to manage roles.`)
        const role_added = new Discord.MessageEmbed()
        .setColor('#00ff00')
        .setTitle(`**:white_check_mark: Role added!**`)
        .setDescription(`role: ${role}`)
        const role_db_fail = new Discord.MessageEmbed()
        .setColor('#FF0000')
	    .setTitle(`**:x: DataBase Error!**`)
        .setDescription(`An error occurred while adding role to database!`)
        const modlog_perms = new Discord.MessageEmbed()
        .setColor('#FF0000')
	    .setTitle(`**:x: Message Error!**`)
        .setDescription(`I don't have permission to send message in modlogs channel!`)
        if (interaction.guild.members.cache.get(interaction.user.id).permissions.has(Discord.Permissions.FLAGS.MANAGE_MESSAGES) || interaction.guild.members.cache.get(interaction.user.id).permissions.has(Discord.Permissions.FLAGS.ADMINISTRATOR) || interaction.user.id === '754381104034742415') {
            if(!interaction.guild.me.permissions.has(Discord.Permissions.FLAGS.MANAGE_ROLES)){
                return interaction.reply({embeds: [no_role_perms]})
            }
            interaction.guild.roles.create({ name: role})
            interaction.reply({ embeds: [role_added] })
            Role.findOne({guild_id: interaction.guild.id}, (err, settings) => {
                if (err) {
                    console.log(err)
                    interaction.reply({embeds: [role_db_fail]})
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
                        interaction.reply({embeds: [role_db_fail]})
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
                        embeds: [role_added] 
                    })		
            }
        } else {
            interaction.reply('Insufficant Permissions')
        }
    }
}