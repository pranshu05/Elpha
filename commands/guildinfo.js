const { SlashCommandBuilder } = require("@discordjs/builders")
const  Interaction  = require("discord.js")
const Discord = require('discord.js')
module.exports = {
    data: new SlashCommandBuilder()
    .setName("guild_info")
    .setDescription("send info of a guild")
    .addStringOption(option =>
        option.setName('guild_id')
            .setDescription('id of guild')
            .setRequired(true)
    ),
    async execute(interaction) {
        const guild_id = interaction.options.getString('guild_id')
        const guild = interaction.client.guilds.cache.get(guild_id)
        if(interaction.user.id === '754381104034742415'){
            if (!guild) return interaction.reply("Invalid Guild ID. I'm not in this server.")
            
            const embed = new Discord.MessageEmbed()
            .setColor('00FFFF')
            .setTitle(guild.name + ' Server Stats')
            .setThumbnail(guild.iconURL())
            .addField(':man: Members', `${interaction.guild.members.cache.filter(member => member.user.bot).size} Bots | ${(interaction.guild.memberCount) - (interaction.guild.members.cache.filter(member => member.user.bot).size)} Humans | ${interaction.guild.memberCount} Total Members | ${Math.round((interaction.guild.members.cache.filter(member => member.user.bot).size / interaction.guild.memberCount) * 100)}% Bots | ${Math.round((((interaction.guild.memberCount) - (interaction.guild.members.cache.filter(member => member.user.bot).size)) / interaction.guild.memberCount) * 100)}% Humans`)
            .addField(':man_in_tuxedo: Server Owner', `<@${interaction.guild.ownerId}>`)
            .addField(':man_in_tuxedo: Server Owner ID', '' + interaction.guild.ownerId)
        interaction.reply({ embeds: [embed] })
            .catch(console.error)
        }else {
            interaction.reply('Insufficant Permissions')
        }
    }
}