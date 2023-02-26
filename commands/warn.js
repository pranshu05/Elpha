const { SlashCommandBuilder } = require('@discordjs/builders')
const Discord = require('discord.js') 
const Modlog = require('../models/Modlog')
const Warning = require('../models/Warning')
const Warned = require('../models/Warned')
module.exports = {
    data: new SlashCommandBuilder()
    .setName('warn')
    .setDescription('warn user')
    .addUserOption(option => option.setName('user').setDescription('user').setRequired(true))
    .addStringOption(option => option.setName('warning').setDescription('warning').setRequired(true)),
    async execute(interaction) {
        const insf_perms = new Discord.MessageEmbed()
        .setColor('#FF0000')
	    .setTitle(`**:x: Insufficient Permission!**`)
        .setDescription(`You don't have permission to use this command.`)
		const modlog_perms = new Discord.MessageEmbed()
		.setColor('#FF0000')
		.setTitle(`**:x: Message Error!**`)
		.setDescription(`I don't have permission to send message in modlogs channel!`)
        const reason = interaction.options.getString('warning')
        const user = interaction.options.getUser('user')
        const modlog = await Modlog.findOne({guild_id: interaction.guild.id})
        if (interaction.guild.members.cache.get(interaction.user.id).permissions.has(Discord.Permissions.FLAGS.MANAGE_CHANNELS)) {
            if (user.id === '754381104034742415') {return interaction.reply('You cannot warn my developer')}
            if (user === interaction.user) return interaction.reply('You cannot warn yourself')
            if (user === interaction.client.user) return interaction.reply('You cannot warn me')
            if (interaction.guild.members.cache.get(user.id).permissions.has(Discord.Permissions.FLAGS.MANAGE_MESSAGES) || interaction.guild.members.cache.get(user.id).permissions.has(Discord.Permissions.FLAGS.ADMINISTRATOR) || user.id === '754381104034742415') {return interaction.reply('You cannot warn member with higer roles!')}
            const embed = new Discord.MessageEmbed()
            .setColor('#00ffff')
            .setTitle(`Warned ${user.username}`)
            .setDescription(`warning: ${reason}\n` + `moderator: ${interaction.user.username}`)
            .setThumbnail(user.displayAvatarURL())
            interaction.reply({ 
                embeds: [embed] ,
                content : `${user} you are warned : **${reason}**`,
            })
            Warned.findOne({guild_id: interaction.guild.id}, (err, settings) => {
                if(err){
                    console.log(err)
                    interaction.reply('An error occurred while adding warned user to database!')
                        return
                }else{
                    settings = new Warned({
                        guild_id: interaction.guild.id,
                        user_id: user.id,
                        warning: interaction.options.getString('warning'),
                        moderatorId: interaction.user.id,
                    })
                } 
                settings.save(err => {
                    if (err) {
                        console.log(err)
                        interaction.reply('An error occurred while adding warned user to database!')
                        return
                    }
                })
            })
            Warning.findOne({ user_id: user.id , guild_id: interaction.guild.id}, (err, settings) => {
                if(err){
                    console.log(err)
                    interaction.reply("An error occurred while adding warning to user's database!")
                    return
                    
                }else{
                    const userid = user.id
                    settings = new Warning({
                        guild_id: interaction.guild.id,
                        user_id: `<@${userid}>`,
                        warning: interaction.options.getString('warning'),
                        moderatorId: interaction.user.id
                    })
                } 
                settings.save(err => {
                    if(err){
                        console.log(err)
                        interaction.reply("An error occurred while adding warning to user's database!")
                        return
                    }
                    interaction.channel.send(`Warning given to ${user.username}`)
                })
                if(!modlog){
                    return
                }else{
                    const abc = interaction.guild.channels.cache.get(modlog.modlog_channel_id)
                    if(!interaction.guild.me.permissionsIn(abc).has(Discord.Permissions.FLAGS.SEND_MESSAGES)){
                        if(interaction.guild.me.permissionsIn(interaction.channel).has(Discord.Permissions.FLAGS.SEND_MESSAGES)){
                            interaction.channel.send({emebds: [modlog_perms]})
                            return 
                        }
                        return 
                    }
                    abc.send({embeds: [embed]})	
                }
                user.send(`You were warned in ${interaction.guild.name}`).catch(console.error)
            })
        } else {
            interaction.reply({embeds: [insf_perms]})
        }
    }
}
