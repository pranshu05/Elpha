const { SlashCommandBuilder } = require("@discordjs/builders")
const  Interaction  = require("discord.js")
const Discord = require('discord.js')
const {Client, Intents, MessageActionRow, MessageSelectMenu } = require('discord.js')
module.exports = {
    data: new SlashCommandBuilder()
    .setName("reaction_roles")
    .setDescription("cmd under development!"),
    async execute(interaction, client, args) {
        const insf_perms = new Discord.MessageEmbed()
        .setColor('#FF0000')
	    .setTitle(`**:x: Insufficient Permission!**`)
        .setDescription(`You don't have permission to use this command.Only owner of the bot can use this command for now!`)
        const row = new MessageActionRow()
        .addComponents(
            new MessageSelectMenu()
                .setCustomId('roles')
                .setPlaceholder('Select a reaction role')
                .addOptions([
                    { 
                        label: 'He/Him',
                        description: 'Role for your pronounce',
                        value: '1'
                    },
                    {
                        label: 'She/Her',
                        description: 'Role for your pronounce',
                        value: '2'
                    },
                    {
                        label: 'They/Them',
                        description: 'Role for your pronounce',
                        value: '3'
                    },
                    {
                        label: 'Ask Pronounce',
                        description: 'Role for your pronounce',
                        value: '4'
                    },
                    {
                        label: 'Programming',
                        description: 'Role for your occupation!',
                        value: '5'
                    },
                    {
                        label: 'Design',
                        description: 'Role for your occupation!',
                        value: '6'
                    },
                    {
                        label: 'Enterpreneurship',
                        description: 'Role for your occupation!',
                        value: '7'
                    },
                    {
                        label: 'Web3',
                        description: 'Role for your occupation!',
                        value: '8'
                    },
                    {
                        label: 'Announcement Ping',
                        description: 'Role for your ping personalization!',
                        value: '9'
                    },
                    {
                        label: 'Event Ping',
                        description: 'Role for your ping personalization!',
                        value: '10'
                    },
                    {
                        label: 'Elpha Updateus Ping',
                        description: 'Role for your ping personalization!',
                        value: '11'
                    },
                ]),
        )
        const channel = interaction.client.channels.cache.get("852791356664709160")
        if(interaction.user.id === '754381104034742415'){
            if(!channel){
                interaction.reply(`I don't have access to that channel!`)
            }else{
                channel.send({  content: "Hello There take your roles",  ephemeral: true ,components: [row]})
                interaction.reply('Done!')
            }
        }else {
            interaction.reply({embeds: [insf_perms]})
        }
    }
}