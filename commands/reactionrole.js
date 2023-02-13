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
        const pronRolesEmbed = new Discord.MessageEmbed()
        .setTitle("Customize Your Pronounce Roles")
        .setColor("#5267f6")
        .setDescription(
          "Select by which Pronounce you identify as by selecting the role below:"
        )
        const pronRolesMenu = new MessageSelectMenu()
        .setCustomId('pronounce_roles')
        .setPlaceholder('Select your Pronounce')
        .addOptions([
          {
            label: 'He/Him',
            description: 'Let people know your He/Him!',
            value: 'role1'
          },
          {
            label: 'She/Her',
            description: 'Let people know your She/Her!',
            value: 'role2'
          },
          {
            label: 'Ask Pronounce',
            description: 'Select this if you want ppl to ask your pronounce!',
            value: 'role3'
          },
          {
            label: 'They/Them',
            description: 'Let people know your They/Them!',
            value: 'role3'
          },
        ])
        const channel = interaction.client.channels.cache.get("852791356664709160")
        if(interaction.user.id === '754381104034742415'){
            if(!channel){
                interaction.reply(`I don't have access to that channel!`)
            }else{
                channel.send({ embeds: [pronRolesEmbed], components: [{ type: 1, components: [pronRolesMenu] }] })
                interaction.reply('Done!')
            }
        }else {
            interaction.reply({embeds: [insf_perms]})
        }
    }
}