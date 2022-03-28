const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require('discord.js')
const got = require('got')
module.exports = {
    data: new SlashCommandBuilder()
    .setName("eat-or-pass")
    .setDescription("send eat or pass poll")
      .addChannelOption(option => option
			.setName("channel")
			.setDescription("The channel to send the poll")
			.setRequired(true)
		),
    async execute(interaction) {
        const embed = new Discord.MessageEmbed()
        got('https://www.reddit.com/r/food/random/.json')
            .then(response => {
                const [list] = JSON.parse(response.body)
                const [post] = list.data.children
                const permalink = post.data.permalink
                const foodUrl = `https://reddit.com${permalink}`
                const foodImage = post.data.url
                const foodTitle = post.data.title
                const foodUpvotes = post.data.ups
                const foodNumComments = post.data.num_comments
                embed.setTitle(`Eat or Pass`)
                embed.setColor('#00FFFF')
                embed.setImage(foodImage)
		const message = interaction.reply({ embeds: [embed] })
		message.react(':regional_indicator_e:')
			.then(() => message.react(':regional_indicator_p:'))
			.catch(error => console.error('One of the emojis failed to react:', error))
            })
            .catch(console.error)
    }
}
