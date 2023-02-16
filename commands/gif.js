require('dotenv').config()
const { SlashCommandBuilder } = require('@discordjs/builders')
const Discord = require('discord.js')
const fetch = require("node-fetch")
module.exports = {
    data: new SlashCommandBuilder()
    .setName('gif')
    .setDescription('search for gif')
    .addStringOption(option => option.setName('name').setDescription('name of the GIF').setRequired(true)
    ),
    async execute(interaction) {
        const name = interaction.options.getString('name')
        let url = `https://tenor.googleapis.com/v2/search?q=${name}&key=${process.env.tenor}&client_key=my_test_app&limit=50`
        let response = await fetch(url)
        let json = await response.json()
        let url_index = Math.floor(Math.random() * json.results.length)
        let random_url = json.results[url_index].url
        if(!interaction.guild.me.permissionsIn(interaction.channel).has(Discord.Permissions.FLAGS.SEND_MESSAGES)){
            return interaction.reply({content: `I don't have permission to send message in this channel`, ephemeral: true})
        }else{
            interaction.channel.send(`${random_url}`)
            interaction.reply({content: `Done!`, ephemeral: true})
        }
    }
}