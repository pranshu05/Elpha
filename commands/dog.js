const { SlashCommandBuilder } = require("@discordjs/builders")
const  Interaction  = require("discord.js")
const Discord = require('discord.js')
const fetch = require('node-fetch')

module.exports = {
    data: new SlashCommandBuilder()
    .setName("dog")
    .setDescription("Random dog's pic"),

    async execute(interaction) {

        const subreddits = [
            'dog',
            'dogpics',
            'puppies',
            'beaglepics',
            'husky',
        ]

        const data = await fetch(`https://imgur.com/r/${subreddits[Math.floor(Math.random() * subreddits.length)]}/hot.json`)
			.then(response => response.json())
			.then(body => body.data)
		
		const selected = data[Math.floor(Math.random() * data.length)]

        const embed = new Discord.MessageEmbed()

       .setColor('#00ffff')
        .setTitle(`Woof!`)
        .setImage(`https://imgur.com/${selected.hash}${selected.ext.replace(/\?.*/, '')}`)
        
        interaction.reply({ embeds: [embed] })
        
    }
    
}