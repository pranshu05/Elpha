const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require('discord.js')
const got = require('got')
module.exports = {
    data: new SlashCommandBuilder()
    .setName("anime")
    .setDescription("Random anime's pic"),
    async execute(interaction) {
        const embed = new Discord.MessageEmbed()
        got('https://www.reddit.com/r/animepics/random/.json')
            .then(response => {
                const [list] = JSON.parse(response.body)
                const [post] = list.data.children
                const permalink = post.data.permalink
                const animeUrl = `https://reddit.com${permalink}`
                const animeImage = post.data.url
                const animeTitle = post.data.title
                const animeUpvotes = post.data.ups
                const animeNumComments = post.data.num_comments
                embed.setTitle(`${animeTitle}`)
                embed.setColor('#00FFFF')
                embed.setImage(animeImage)
                embed.setFooter(`👍 ${animeUpvotes} | 💬 ${animeNumComments}`)
                interaction.reply({ embeds: [embed] })
            })
            .catch(console.error)
    }
}