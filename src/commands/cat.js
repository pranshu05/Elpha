const { SlashCommandBuilder } = require('@discordjs/builders')
const { EmbedBuilder } = require('discord.js')
const axios = require('axios')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('cat')
        .setDescription("Random cat's pic"),
    async execute(interaction) {
        const embed = new EmbedBuilder()

        axios
            .get('https://www.reddit.com/r/catpics/random/.json')
            .then((response) => {
                const [list] = response.data
                const [post] = list.data.children
                const catImage = post.data.url
                const catUpvotes = post.data.ups
                embed.setTitle(`Download`)
                embed.setDescription(`:heart: **${catUpvotes}**`)
                embed.setURL(catImage)
                embed.setColor('#00FFFF')
                embed.setImage(catImage)
                interaction.reply({ embeds: [embed] })
            })
            .catch(console.error)
    },
}
