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
const ms = require('ms')
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
            .setDescription(interaction.client.user.username + ' has been awake for ' + `${ms(process.uptime(), { long: true })}`)
            .addFields(
            { name: '\u200B', value: '\u200B' },
            {name: '🏠 Guilds', value: `\`\`\`${interaction.client.guilds.cache.size}\`\`\``, inline: true},
            {name: '🤵 Total Users', value: `\`\`\`${(totalPeople)}\`\`\``, inline: true},
            {name: ':floppy_disk: System Uptime', value: `\`\`\`${ms(os.uptime(), { long: true })}\`\`\``, inline: true},
            {name: '🏓 Ping', value: `\`\`\`${(interaction.client.ws.ping).toFixed(0)} ms\`\`\``, inline: true},
            {name: ':control_knobs: Library', value: `\`\`\`discord.js v${Discord.version}\`\`\``, inline: true},
            {name: ':computer: Node.js Version', value: `\`\`\`${process.version}\`\`\``, inline: true},
            {name: 'Server', value: '[Click here](https://discord.gg/uJCX5yfuTf)'},
            {name: 'Github Repo', value: '[Click here](https://github.com/pranshu05/Elpha)'},
            )
        interaction.reply({ embeds: [embed] })
    }
}