const discord = require('discord.js')
const { SlashCommandBuilder } = require("@discordjs/builders")
const fetch = require("node-fetch")
module.exports = {
    data: new SlashCommandBuilder()
    .setName("covid")
    .setDescription("Sends covid stats of given country")
    .addStringOption(option => 
        option
        .setName("country")
        .setDescription("location")
        .setRequired(true)
        ),
        async execute(interaction){
           const country = interaction.options.getString("country")
           fetch(`https://covid19.mathdro.id/api/countries/${country}`).then(res => res.json()).then(json => {
            let embed = new discord.MessageEmbed()
            .setColor('#00FFFF')
            .setTitle(`${country}'s covid stats`)
            .setDescription("Number of cases may differ from other sources")
            .addField("Cases", `**`+ json.confirmed['value'] +`**`, true)
            .addField("Deaths", `**`+ json.deaths['value'] +`**`, true)
            .addField("Recovered", `**`+ "Do maths and find out XD" +`**`)
            .setFooter("Last Update", + json.lastUpdate)
            .setTimestamp()
            interaction.reply({ embeds: [embed] })
        })
    }
}