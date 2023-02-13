const { SlashCommandBuilder } = require("@discordjs/builders")
const  Interaction  = require("discord.js")
const Discord = require('discord.js')
module.exports = {
    data: new SlashCommandBuilder()
    .setName("reaction_roles")
    .setDescription("cmd under development!"),
    async execute(interaction) {
        const insf_perms = new Discord.MessageEmbed()
        .setColor('#FF0000')
	    .setTitle(`**:x: Insufficient Permission!**`)
        .setDescription(`You don't have permission to use this command.Only owner of the bot can use this command for now!`)
        const occ_role = new Discord.MessageEmbed()
        .setColor('#00FFFF')
        .setTitle(`**:construction_worker::skin-tone-1: Occupation Roles**`)
        .setDescription(`:man_technologist_tone1: Programming \n :artist::skin-tone-1: Design \n :levitate::skin-tone-1: Entrepreneurship \n :coin: web3 \n `)
        const channel = interaction.client.channels.cache.get("852791356664709160")
        if(interaction.user.id === '754381104034742415'){
            if(!channel){
                interaction.reply(`I don't have access to that channel!`)
            }else{
                channel.send({embeds: [occ_role]}).then(sentEmbed => {
                    sentEmbed.react(":man_technologist_tone1:")
                    sentEmbed.react(":artist::skin-tone-1:")
                    sentEmbed.react(":levitate::skin-tone-1:")
                    sentEmbed.react(":coin:")
                })
            }
        }else {
            interaction.reply({embeds: [insf_perms]})
        }
    }
}