const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require('discord.js')
const got = require('got')
module.exports = {
    data: new SlashCommandBuilder()
    .setName("dog")
    .setDescription("Random dog's pic"),
    async execute(interaction) {
        const embed = new Discord.MessageEmbed()
        got('https://www.reddit.com/r/dogpics/random/.json')
            .then(response => {
                const [list] = JSON.parse(response.body)
                const [post] = list.data.children
                const permalink = post.data.permalink
                const dogUrl = `https://reddit.com${permalink}`
                const dogImage = post.data.url
                const dogTitle = post.data.title
                const dogUpvotes = post.data.ups
                const dogNumComments = post.data.num_comments
                embed.setTitle(`${dogTitle}`)
                embed.setColor('#00FFFF')
                embed.setImage(dogImage)
                embed.setFooter(`👍 ${dogUpvotes} 💬 ${dogNumComments}`)
                interaction.reply({ embeds: [embed] })
            })
            .catch(console.error)
    }
}