const { EmbedBuilder } = require('discord.js')

function errEmbed() {
    const embed = new EmbedBuilder()
        .setColor('#ff0000')
        .setThumbnail('https://i.imgur.com/9c4a2pC.png')
        .setTitle(':x: Error :x:')
        .setTimestamp()
    return embed
}

module.exports = {
    errEmbed,
}
