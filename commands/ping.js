

const { SlashCommandBuilder } = require('@discordjs/builders');

const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Sends the bot\'s ping '),
	async execute(client, interaction) {
		
    
        


                let ping = new MessageEmbed()
                .setTitle(`Pong!`)
                .setColor('#00ffff')
		.addField('🏓 Ping', `${(interaction.client.ws.ping).toFixed(0)} ms`, true)
                
    
                interaction.Reply({ embeds: [ping] });
		});
	},
};
