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
            .addField('📄 Channels', `${interaction.guild.channels.cache.filter(chan => chan.type === 'GUILD_VOICE').size} Voice Channels | ${interaction.guild.channels.cache.filter(chan => chan.type === 'GUILD_TEXT').size} Text Channels | ${interaction.guild.channels.cache.filter(chan => chan.type === 'GUILD_CATAGORY').size} Categories | ${Math.round((interaction.guild.channels.cache.filter(chan => chan.type === 'GUILD_VOICE').size / interaction.guild.channels.cache.size) * 100)}% Voice Channels | ${Math.round((interaction.guild.channels.cache.filter(chan => chan.type === 'GUILD_TEXT').size / interaction.guild.channels.cache.size) * 100)}% Text Channels | ${Math.round((interaction.guild.channels.cache.filter(chan => chan.type === 'GUILD_CATAGORY').size / interaction.guild.channels.cache.size) * 100)}% Categories`, true)
            .addField(':man: Members', `${interaction.guild.members.cache.filter(member => member.user.bot).size} Bots | ${(interaction.guild.memberCount) - (interaction.guild.members.cache.filter(member => member.user.bot).size)} Humans | ${interaction.guild.memberCount} Total Members | ${Math.round((interaction.guild.members.cache.filter(member => member.user.bot).size / interaction.guild.memberCount) * 100)}% Bots | ${Math.round((((interaction.guild.memberCount) - (interaction.guild.members.cache.filter(member => member.user.bot).size)) / interaction.guild.memberCount) * 100)}% Humans`, true)
            .addField(':date: Guild Created At', '' + interaction.guild.createdAt, true)
            .addField(':keyboard: AFK Channel ID ', interaction.guild.afkChannelId === null ? 'None Set' : interaction.guild.afkChannelID, true)
            .addField(':keyboard: AFK Channel Timeout', interaction.guild.afkTimeout + ' seconds', true)
            .addField(':frame_photo: Server Icon', interaction.channel.guild.iconURL() === null ? 'Default Icon' : interaction.channel.guild.iconURL(), true)
            .addField(':id: Guild ID', interaction.guild.id, true)
            .addField(':man_in_tuxedo: Server Owner', `<@${interaction.guild.ownerId}>`, true)
            .addField(':man_in_tuxedo: Server Owner ID', '' + interaction.guild.ownerId, true)
            .addField(':closed_lock_with_key: Server Verification Level', interaction.guild.verificationLevel, true)
            .addField(':joystick: Roles Size', '' + interaction.guild.roles.cache.size, true)
        interaction.reply({ embeds: [embed] })
        // Enable this if you want server roles to be printed interaction.reply("Roles List:\n" + interaction.guild.roles.map(e => e.toString()).join(" "), { code: 'js' })
    }
}