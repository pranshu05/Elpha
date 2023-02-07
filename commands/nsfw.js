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
                const permalink = post.data.permalink
                const memeUrl = `https://reddit.com${permalink}`
                const memeImage = post.data.scrubber_media_url
                const memeTitle = post.data.title
                interaction.reply(`${memeTitle}||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​|| ${memeImage}`)
            })
            .catch(console.error)
    }
}
