const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require('discord.js')
const got = require('got')
module.exports = {
    data: new SlashCommandBuilder()
    .setName("meme")
    .setDescription("Random memes"),
    async execute(interaction) {
        const embed = new Discord.MessageEmbed()
        got('https://www.reddit.com/r/memes/random/.json')
            .then(response => {
                const [list] = JSON.parse(response.body)
                const [post] = list.data.children
                const permalink = post.data.permalink
                const memeUrl = `https://reddit.com${permalink}`
                const memeImage = post.data.url
                const memeTitle = post.data.title
                const memeUpvotes = post.data.ups
                const memeNumComments = post.data.num_comments
                embed.setTitle(`${memeTitle}`)
                embed.setColor('#00FFFF')
                embed.setImage(memeImage)
                embed.setFooter(`👍 ${memeUpvotes} 💬 ${memeNumComments}`)
                interaction.reply({ embeds: [embed] })
            })
            .catch(console.error)
    }
}