const Discord = require('discord.js')

module.exports = {
    name: 'messageDelete',
    async execute(message, client) {
        if (message.author.bot) return
        if (!message.content) return

        const regex = /<@!?(1|\d{17,19})>/

        if (
            !message.guild.me
                .permissionsIn(message.channel)
                .has(Discord.Permissions.FLAGS.SEND_MESSAGES)
        ) {
            return
        } else {
            if (message.content.match(regex)) {
                console.log(
                    `${message.author.username} ghost pinged in ${message.channel} in ${message.guild}`
                )

                const embed = new Discord.MessageEmbed()
                    .setColor('RED')
                    .setAuthor(
                        message.author.username,
                        message.author.displayAvatarURL
                    )
                    .setDescription(
                        `Well well well, <@${message.author.id}> decided to ghost-ping a user..`
                    )
                    .addField('Their Message', `${message.content}`)

                message.channel.send({ embeds: [embed] })
            } else if (message.content.match('@everyone')) {
                console.log(
                    `${message.author.username} ghost pinged everyone in ${message.channel} in ${message.guild}`
                )

                const embed = new Discord.MessageEmbed()
                    .setColor('RED')
                    .setAuthor(
                        message.author.username,
                        message.author.displayAvatarURL
                    )
                    .setDescription(
                        `Well well well, <@${message.author.id}> decided to ghost-ping everyone..`
                    )
                    .addField('Their Message', `${message.content}`)

                message.channel.send({ embeds: [embed] })
            }
        }
    },
}
