const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require('discord.js') 
const moment = require('moment')
module.exports = {
    data: new SlashCommandBuilder()
    .setName("userinfo")
    .setDescription("sends user's info")
    .addUserOption(option =>
        option.setName('user')
            .setDescription('Select a user')
            .setRequired(true)
    ),
    async execute(interaction) {
        const member = interaction.options.getMember('user')
        const user = interaction.options.getUser('user')
        var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' }
        let rolemap = member.roles.cache.sort((a, b) => b.position - a.position).map(r => r).join(" ")
        if (rolemap.length > 1024) rolemap = "`The user has to many roles to display all of them!`"
        if (!rolemap) rolemap = "`The user doesn't have any roles!`"
        let status = {
            online: 'Online',
            idle: 'Idle',
            dnd: 'Do Not Disturb',
            offline: 'Offline/Invisible'
        }
        let status2 = {
            true: 'Bot',
            false: 'Not a Bot'
        }
        const embed = new Discord.MessageEmbed()
       .setColor('#00ffff')
        .setTitle(`User info`)
        .setAuthor(user.username + '#' + user.discriminator, user.displayAvatarURL())
        .setColor("00FFFF")
        .setThumbnail(user.displayAvatarURL())
        .addFields(
        { name: 'Name', value: "`" + `${user.username}` + "`", inline: true }, 
        { name: 'ID', value: "`" + `${user.id}` + "`", inline: true }, 
        { name: 'Nickname', value: "`" + `${member.nickname || "No Nickname"}` + "`", inline: true }, 
        { name: 'Bot', value: "`" + `${status2[user.bot]}` + "`", inline: true }, 
        { name: 'Account Created', value: `<t:` + `${Math.floor(user.createdTimestamp/1000)}` + `:R>`, inline: true }, 
        { name: 'Joined', value: `<t:` + `${Math.floor(member.joinedTimestamp/1000)}` + `:R>`, inline: true }, 
        //{ name: 'Status', value: "`" + `${status[member.presence.status]}` + "`", inline: true }, 
        { name: 'Server Boosting Since', value: "`" + `${member.premiumSince?.toLocaleDateString("en-US", options) || "Not Boosting"}` + "`", inline: true }, 
        { name: 'Last Timeout', value: "`" + `${member.communicationDisabledUntil?.toLocaleDateString("en-US", options) || "Never Timed Out"}` + "`", inline: true }, 
        { name: 'Voice Channel', value: `${member.voice.channel || "`Currently not in a Voice Channel`"}`, inline: true },
		{ name: 'Roles', value: rolemap, inline: true },
		{ name: 'Permissions', value: "`"+`${member.permissions.toArray()}`+"`", inline: false },
	    )
	    .setTimestamp()
        .setFooter(`Info of ${user.username}#${user.discriminator} requested by ${interaction.user.username}`)
        interaction.reply({ embeds: [embed] })
    }
}