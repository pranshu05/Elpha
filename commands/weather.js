const weather = require('weather-js')
const discord = require('discord.js')
const { SlashCommandBuilder } = require("@discordjs/builders")
module.exports = {
    data: new SlashCommandBuilder()
    .setName("weather")
    .setDescription("Sends weather of given location")
    .addStringOption(option => 
        option
        .setName("location")
        .setDescription("location")
        .setRequired(true)
        ),
        async execute(interaction){
           const location = interaction.options.getString("location")
           weather.find({search: location, degreeType: 'C'}, function(err, result) {
            try {
            let embed = new discord.MessageEmbed()
            .setTitle(`Weather - ${result[0].location.name}`)
            .setColor("#00FFFF")
            .addField("Temperature", `${result[0].current.temperature} Celcius`, true)
            .addField("Sky Text", result[0].current.skytext, true)
            .addField("Humidity", result[0].current.humidity, true)
            .addField("Wind Speed", result[0].current.windspeed, true)
            .addField("Observation Time", result[0].current.observationtime, true)
            .addField("Wind Display", result[0].current.winddisplay, true)
            .setThumbnail(result[0].current.imageUrl)
            .setFooter(`weather-info requested by ${interaction.user.username}`)
            interaction.reply({ embeds: [embed] })
            } 
            catch(err) {
              interaction.reply("Unable To Get the data of Given location")
            }
        })
    }
}