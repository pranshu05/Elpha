

const { SlashCommandBuilder } = require('@discordjs/builders');

const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Sends the bot\'s ping and latency'),
	async execute(client, interaction) {
		let ping = new MessageEmbed()
        .setTitle(`Calculating ping...`)
    
        const startTime = Date.now();
        interaction.reply({ embeds: [ping] })
        .then(msg => {
            const endTime = Date.now();
            var pong = endTime-startTime;

            let apipong = Math.round(client.ws.ping);

            let emoj;

            let colo;

            if (apipong < 60) {
              emoj = "<:3bar:908545977177214977>"
              colo = "GREEN"
            } else if (apipong > 60 && apipong < 100) {
              emoj = "<:2bar:908546068038422628>"
              colo = "ORANGE"
            } else {
              emoj = "<:1bar:908546024115695656>"
              colo = "RED"
            }
    
                let ping = new MessageEmbed()
                .setTitle(`${emoj} Pong!`)
                .setColor(colo)
                .setDescription(`Latency: ${pong} ms \nApi Latency: ${apipong} ms` )
    
                interaction.editReply({ embeds: [ping] });
		});
	},
};
