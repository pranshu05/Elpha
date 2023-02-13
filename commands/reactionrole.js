const { SlashCommandBuilder } = require("@discordjs/builders")
const  Interaction  = require("discord.js")
const Discord = require('discord.js')
const {MessageActionRow,  MessageButton,  ButtonInteraction, MessageSelectMenu, } = require('discord.js')
module.exports = {
    data: new SlashCommandBuilder()
    .setName("reaction_roles")
    .setDescription("cmd under development!"),
    async execute(interaction, client, args) {
        const insf_perms = new Discord.MessageEmbed()
        .setColor('#FF0000')
	    .setTitle(`**:x: Insufficient Permission!**`)
        .setDescription(`You don't have permission to use this command.Only owner of the bot can use this command for now!`)
        const genRolesEmbed = new Discord.MessageEmbed()
        .setTitle("Customize Your Gender Roles")
        .setColor("#5267f6")
        .setDescription(
          "Select which Gender you identify as by selecting the role below:"
        )
        const genRolesMenu = new MessageSelectMenu()
        .setCustomId('gender_roles')
        .setPlaceholder('Select your Gender Status')
        .addOptions([
          {
            label: 'Gender: Male',
            emoji: ":male_sign:",
            description: 'Let people know your Male!',
            value: 'test',
          },
          {
            label: 'Gender: Female',
            emoji: ":female_sign:",
            description: 'Let people know your Female!',
            value: 'test2',
          },
          {
            label: 'Gender: Non-Binary',
            emoji: ":white_large_square:",
            description: 'Select this if you are Non-Binary!',
            value: 'test3',
          },
        ])
        const channel = interaction.client.channels.cache.get("852791356664709160")
        if(interaction.user.id === '754381104034742415'){
            if(!channel){
                interaction.reply(`I don't have access to that channel!`)
            }else{
                channel.send({ embeds: [genRolesEmbed], components: [{ type: 1, components: [genRolesMenu] }] })
                interaction.reply('Done!')
            }
        }else {
            interaction.reply({embeds: [insf_perms]})
        }
    }
}