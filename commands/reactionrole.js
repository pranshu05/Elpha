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
        .setTitle(`**👷🏻 Occupation Roles**`)
        .setDescription(`👨🏻‍💻 Programming \n\n 🧑🏻‍🎨 Design \n\n 🤵🏻 Entrepreneurship \n\n :coin: web3 \n `)
        const channel = interaction.client.channels.cache.get("852791356664709160")
        if(interaction.user.id === '754381104034742415'){
            if(!channel){
                interaction.reply(`I don't have access to that channel!`)
            }else{
                channel.send({embeds: [occ_role]}).then(sentEmbed => {
                    sentEmbed.react("👨🏻‍💻")
                    sentEmbed.react("🧑🏻‍🎨")
                    sentEmbed.react("🤵🏻")
                    sentEmbed.react(":coin:")
                })
            }
        }else {
            interaction.reply({embeds: [insf_perms]})
        }
    }
}