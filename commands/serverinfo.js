const { SlashCommandBuilder } = require('@discordjs/builders')
const Discord = require('discord.js')
module.exports = {
    data: new SlashCommandBuilder()
    .setName('serverinfo')
    .setDescription('information about the current server'),
    async execute(interaction) {
        const embed = new Discord.MessageEmbed()
        .setColor('00FFFF')
        .setTitle(interaction.guild.name + ' Server Stats')
        .setThumbnail(interaction.guild.iconURL())
        .addFields(
            {name: '📄 Channels', value: `${interaction.guild.channels.cache.filter(chan => chan.type === 'GUILD_VOICE').size} Voice Channels | ${interaction.guild.channels.cache.filter(chan => chan.type === 'GUILD_TEXT').size} Text Channels | ${interaction.guild.channels.cache.filter(chan => chan.type === 'GUILD_CATEGORY').size} Categories | ${Math.round((interaction.guild.channels.cache.filter(chan => chan.type === 'GUILD_VOICE').size / interaction.guild.channels.cache.size) * 100)}% Voice Channels | ${Math.round((interaction.guild.channels.cache.filter(chan => chan.type === 'GUILD_TEXT').size / interaction.guild.channels.cache.size) * 100)}% Text Channels | ${Math.round((interaction.guild.channels.cache.filter(chan => chan.type === 'GUILD_CATEGORY').size / interaction.guild.channels.cache.size) * 100)}% Categories`},
            {name: ':man: Members', value: `${interaction.guild.members.cache.filter(member => member.user.bot).size} Bots | ${(interaction.guild.memberCount) - (interaction.guild.members.cache.filter(member => member.user.bot).size)} Humans | ${interaction.guild.memberCount} Total Members | ${Math.round((interaction.guild.members.cache.filter(member => member.user.bot).size / interaction.guild.memberCount) * 100)}% Bots | ${Math.round((((interaction.guild.memberCount) - (interaction.guild.members.cache.filter(member => member.user.bot).size)) / interaction.guild.memberCount) * 100)}% Humans`},
            {name: ':date: Guild Created At', value: `${interaction.guild.createdAt}`},
            //{name: ':keyboard: AFK Channel', value: interaction.guild.afkChannel === null ? 'None Set' : interaction.guild.afkChannelID}
            {name: ':keyboard: AFK Channel Timeout', value: `${interaction.guild.afkTimeout}` + ' seconds'},
            {name: ':id: Guild ID', value: `${interaction.guild.id}`},
            {name: ':man_in_tuxedo: Server Owner', value: `<@${interaction.guild.ownerId}>`},
            {name: ':man_in_tuxedo: Server Owner ID', value: `${interaction.guild.ownerId}`},
            {name: ':closed_lock_with_key: Server Verification Level', value: `${interaction.guild.verificationLevel}`},
            {name: ':joystick: Roles Count', value: `${interaction.guild.roles.cache.size}`},
        )
        .setFooter(`requested by ${interaction.user.username}`)
        interaction.reply({ embeds: [embed] })
        // Enable this if you want server roles to be printed interaction.reply("Roles List:\n" + interaction.guild.roles.map(e => e.toString()).join(" "), { code: 'js' })
    }
}