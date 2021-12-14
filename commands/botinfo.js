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
function timeCon(time) {

    time = time * 1000

    let days = 0

    let hours = 0

    let minutes = 0

    let seconds = 0

    days = Math.floor(time / 86400000)

    time -= days * 86400000

    hours = Math.floor(time / 3600000)

    time -= hours * 3600000

    minutes = Math.floor(time / 60000)

    time -= minutes * 60000

    seconds = Math.floor(time / 1000)

    time -= seconds * 1000

    days = days > 9 ? days : '' + days

    hours = hours > 9 ? hours : '' + hours

    minutes = minutes > 9 ? minutes : '' + minutes

    seconds = seconds > 9 ? seconds : '' + seconds

    return (parseInt(days) > 0 ? days + ' days ' : ' ') + (parseInt(hours) === 0 && parseInt(days) === 0 ? '' : hours + ' hours ') + minutes + ' minutes ' + seconds + ' seconds.'

}

module.exports = {

    data: new SlashCommandBuilder()

        .setName('botinfo')

        .setDescription('Basic Information About Elpha'),

        
    async execute(interaction) {



        const config = interaction.client.config

        const args = interaction.options.getString('flags')

        let totalPeople = 0

        let botNumber = 0

        totalPeople = interaction.client.guilds.cache.map(person => person.memberCount).reduce(function (s, v) { return s + (v || 0) }, 0)

        // eslint-disable-next-line no-return-assign

        interaction.client.guilds.cache.map(botPerson => botNumber += botPerson.members.cache.filter(member => member.user.bot).size)

        const embed = new Discord.MessageEmbed()

            .setColor('00FFFF')

            .setTitle(interaction.client.user.username + ' V: ' + pkg.version + ' ' )

            .setDescription(interaction.client.user.username + ' has been awake for ' + timeCon(process.uptime()))

            .addField('🏠 Guilds', '' + interaction.client.guilds.cache.size, true)

            .addField('📄 Channels', '' + interaction.client.channels.cache.size, true)

            .addField('🤵 Total Users', '' + (totalPeople - botNumber), true) // repl with -test cmd contents

            .addField('🤵 Developer :' , 'Pranshu05#4726', true)

            .addField('🐏 RAM Usage', `${((process.memoryUsage().rss / 1024) / 1024).toFixed(2)} MB`, true)

            .addField(':clock: System Uptime', timeCon(os.uptime()), true)

            .addField('🏓 Ping', `${(interaction.client.ws.ping).toFixed(0)} ms`, true)

            .addField(':control_knobs: Library', `Discord JS v${Discord.version}`, true)

            .addField(':computer: Node.js ', `${process.version}`, true)

            .addField(':regional_indicator_h: :regional_indicator_o: :regional_indicator_s: :regional_indicator_t: Host Name', `${os.hostname}`, true)

            .addField(':white_check_mark: Host OS', `${os.platform} ${os.release}`, true)

            interaction.reply({ embeds: [embed] })

    }

}