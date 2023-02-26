const weather = require('weather-js')
const discord = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders')
module.exports = {
    data: new SlashCommandBuilder()
    .setName('weather')
    .setDescription('Sends weather of given location')
    .addStringOption(option => option.setName('location').setDescription('location').setRequired(true)),
        async execute(interaction){
            const location = interaction.options.getString('location')
            weather.find({search: location, degreeType: 'C'}, function(err, result) {
            try {
            let embed = new discord.MessageEmbed()
            .setTitle(`Weather - ${result[0].location.name}`)
            .setColor('#00FFFF')
            .addFields(
                {name: 'Temperature', value: `${result[0].current.temperature} Celcius`, inline: true},
                {name: 'Sky Text',value: `${result[0].current.skytext}`, inline: true},
                {name: 'Humidity',value: `${result[0].current.humidity}`, inline: true},
                {name: 'Wind Speed',value: `${result[0].current.windspeed}`, inline: true},
                {name: 'Observation Time',value: `${result[0].current.observationtime}`, inline: true},
                {name: 'Wind Display',value: `${result[0].current.winddisplay}`, inline: true},
            )
            .setThumbnail(result[0].current.imageUrl)
            .setFooter(`weather-info requested by ${interaction.user.username}`)
            interaction.reply({ embeds: [embed] })
            } 
            catch(err) {
              interaction.reply("Unable To Get the data of Given location's location.")
            }
        })
    }
}