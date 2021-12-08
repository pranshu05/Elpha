const { SlashCommandBuilder } = require("@discordjs/builders");
const  Interaction  = require("discord.js");
const Discord = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    data: new SlashCommandBuilder()
    .setName("cat")
    .setDescription("Random cat's pic"),

    async execute(interaction) {


        
        const subreddits = [
	        'catspics',
	        'catpics',
	        'kittenspics'
        ];

        const data = await fetch(`https://imgur.com/r/${subreddits[Math.floor(Math.random() * subreddits.length)]}/hot.json`)
			.then(response => response.json())
			.then(body => body.data);
		
		const selected = data[Math.floor(Math.random() * data.length)];

        const embed = new Discord.MessageEmbed()

       .setColor('#00ffff')
        .setTitle(`Meow!`)
        .setImage(`https://imgur.com/${selected.hash}${selected.ext.replace(/\?.*/, '')}`)
        
        interaction.reply({ embeds: [embed] })
        
    },
    
}