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
                const permalink = post.data.permalink
                const catUrl = `https://reddit.com${permalink}`
                const catImage = post.data.url
                const catTitle = post.data.title
                const catUpvotes = post.data.ups
                const catNumComments = post.data.num_comments
                embed.setTitle(`Download`)
                embed.setURL(catImage)
                embed.setColor('#00FFFF')
                embed.setImage(catImage)
                //embed.setFooter(`👍 ${catUpvotes} | 💬 ${catNumComments}`)
                interaction.reply({ embeds: [embed] })
            })
            .catch(console.error)
    },
}
