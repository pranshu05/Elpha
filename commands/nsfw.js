const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require('discord.js')
const got = require('got')
module.exports = {
    data: new SlashCommandBuilder()
    .setName("nsfw")
    .setDescription("WARNING! nsfw content 18+ only"),
    async execute(interaction) {
        const embed = new Discord.MessageEmbed()
        got('https://www.reddit.com/r/Hornyjail/random.json?obey_over18=true')
            .then(response => {
                const [list] = JSON.parse(response.body)
                const [post] = list.data.children
                const nsfwImage = post.data.scrubber_media_url
                const nsfwTitle = post.data.title
                embed.setTitle(`${nsfwTitle}`)
                embed.setColor('#00FFFF')
                embed.setImage(nsfwImage)
                interaction.reply({ embeds: [embed] })
            })
            .catch(console.error)
    }
}
