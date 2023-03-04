const { SlashCommandBuilder } = require('@discordjs/builders')
const fs = require('fs')
const dir = './commands'
let commandsLength = 0
fs.readdir(dir, (_err, files) => {
    commandsLength = files.length
})
const Discord = require('discord.js')
const pkg = require('../package.json')
const os = require('os')
let days = Math.floor(client.uptime / 86400000 )
let hours = Math.floor(client.uptime / 3600000 ) % 24 
let minutes = Math.floor(client.uptime / 60000) % 60
let seconds = Math.floor(client.uptime / 1000) % 60
module.exports = {
    data: new SlashCommandBuilder()
    .setName('botinfo')
    .setDescription('Basic Information About Elpha'),
        async execute(interaction) {
        let totalPeople = 0
        totalPeople = interaction.client.guilds.cache.map(person => person.memberCount).reduce(function (s, v) { return s + (v || 0) }, 0)
        const embed = new Discord.MessageEmbed()
            .setColor('00FFFF')
            .setThumbnail(interaction.client.user.displayAvatarURL())
            .setAuthor({name: `Elpha's info`, iconURL: interaction.client.user.displayAvatarURL()})
            .setTitle(interaction.client.user.username + ' V: ' + pkg.version + ' ' )
            .addFields(
            { name: '\u200B', value: '\u200B' },
            {name: '🏠 Guilds', value: `\`\`\`xl\n${interaction.client.guilds.cache.size}\`\`\``, inline: true},
            {name: '🤵 Total Users', value: `\`\`\`xl\n${(totalPeople)}\`\`\``, inline: true},
            {name: ':floppy_disk: System Uptime', value:  `\`\`\`xl\n${days}d, ${hours}h, ${minutes}m, ${seconds}s\n\`\`\``, inline: true},
            {name: '🏓 Ping', value: `\`\`\`xl\n${(interaction.client.ws.ping).toFixed(0)} ms\`\`\``, inline: true},
            {name: ':control_knobs: Library', value: `\`\`\`xl\ndiscord.js v${Discord.version}\`\`\``, inline: true},
            {name: ':computer: Node.js Version', value: `\`\`\`xl\n${process.version}\`\`\``, inline: true},
            {name: 'Server', value: '[Click here](https://discord.gg/uJCX5yfuTf)'},
            {name: 'Github Repo', value: '[Click here](https://github.com/pranshu05/Elpha)'},
            )
        interaction.reply({ embeds: [embed] })
    }
}