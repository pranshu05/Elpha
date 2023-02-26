const { SlashCommandBuilder } = require('@discordjs/builders')
const Discord = require('discord.js')
module.exports = {
    data: new SlashCommandBuilder()
    .setName('guild_info')
    .setDescription('send info of a guild')
    .addStringOption(option => option.setName('guild_id').setDescription('id of guild').setRequired(true)),
    async execute(interaction) {
        const insf_perms = new Discord.MessageEmbed()
        .setColor('#FF0000')
	    .setTitle(`**:x: Insufficient Permission!**`)
        .setDescription(`You don't have permission to use this command.Only owner of the bot can use this command!`)
        const guild_id = interaction.options.getString('guild_id')
        const guild = interaction.client.guilds.cache.get(guild_id)
        if(interaction.user.id === '754381104034742415'){
            if (!guild) return interaction.reply("Invalid Guild ID. I'm not in this server.")
            const embed = new Discord.MessageEmbed()
            .setColor('00FFFF')
            .setTitle(guild.name + ' Server Stats')
            .setThumbnail(guild.iconURL())
            .addFields(
                {name: ':man: Members', value: `${guild.members.cache.filter(member => member.user.bot).size} Bots | ${(guild.memberCount) - (guild.members.cache.filter(member => member.user.bot).size)} Humans | ${guild.memberCount} Total Members | ${Math.round((guild.members.cache.filter(member => member.user.bot).size / guild.memberCount) * 100)}% Bots | ${Math.round((((guild.memberCount) - (guild.members.cache.filter(member => member.user.bot).size)) / guild.memberCount) * 100)}% Humans`},
                {name: ':man_in_tuxedo: Server Owner', value: `<@${guild.ownerId}>`},
                {name: ':man_in_tuxedo: Server Owner ID', value: guild.ownerId},
            )
            interaction.reply({embeds: [embed]}).catch(console.error)
        }else {
            interaction.reply({embeds: [insf_perms]})
        }
    }
}