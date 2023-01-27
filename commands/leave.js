const { SlashCommandBuilder } = require("@discordjs/builders")
const  Interaction  = require("discord.js")
const Discord = require('discord.js')
module.exports = {
    data: new SlashCommandBuilder()
    .setName("leave")
    .setDescription("force bot to leave a server")
    .addStringOption(option =>
        option.setName('guild_id')
            .setDescription('id of guild')
            .setRequired(true)
    ),
    async execute(interaction, client) {
        const guild_id = interaction.options.getString('guild_id')
        const guild = client.guilds.cache.get(guild_id)
        if(interaction.user.id === '754381104034742415'){
            if (!guild) return interaction.reply("Invalid Guild ID. I'm not in this server.")

            guild.leave()
            .catch(console.error)
        }else {
            interaction.reply('Insufficant Permissions')
        }
    }
}