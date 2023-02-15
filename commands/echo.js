const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require('discord.js')
module.exports = {
    data: new SlashCommandBuilder()
    .setName("echo")
    .setDescription("Echoes your inputs!")
    .addStringOption(option => option.setName("message").setDescription("The message to Echo").setRequired(true)),
    async execute(interaction){
        const message = interaction.options.getString("message")
        if(!interaction.guild.me.permissionsIn(interaction.channel).has(Discord.Permissions.FLAGS.SEND_MESSAGES)){
            return interaction.reply({content: `I don't have permission to send message in this channel`, ephemeral: true})
        }else{
            interaction.channel.send(message)
            interaction.reply({content: `Done!`, ephemeral: true})
        }
    }
}