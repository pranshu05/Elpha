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
                    { //edit the option according to you ⚠leave the emoji fields like they are 
                        label: 'Reaction Role 1',
                        description: 'Take this role by clicking me ',
                        value: 'first_option',
                        emoji: r1m
                    },
                    {
                        label: 'Reaction Role 2',
                        description: 'Take this role by clicking me ',
                        value: 'second_option',
                        emoji: r2m
                    },
                    {
                        label: 'Reaction Role 3',
                        description: 'Take this role by clicking me ',
                        value: 'third_option',
                        emoji: r3m
                    },
                    {
                        label: 'Reaction Role 4',
                        description: 'Take this role by clicking me ',
                        value: 'fourth_option',
                        emoji: r4m
                    },
                    {
                        label: 'Reaction Role 5',
                        description: 'Take this role by clicking me s',
                        value: 'fifth_option',
                        emoji: r5m
                    },
                ]),
        );
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