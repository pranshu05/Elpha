const { EmbedBuilder } = require('discord.js')

function warnEmbed() {
    const embed = new EmbedBuilder()
        .setColor('#ffff00')
        .setThumbnail('https://i.imgur.com/uoDFRrS.png')
        .setTitle('⚠️ Warning ⚠️')
        .setTimestamp()
    return embed
}

module.exports = {
    warnEmbed,
}
