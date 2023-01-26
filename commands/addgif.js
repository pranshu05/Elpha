const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require('discord.js')
const Gif = require("../models/Gif")
const gif_success = require("../utils/gif_success")
const gif_fail = require('../utils/gif_fail')
module.exports = {
    data: new SlashCommandBuilder()
    .setName("addgif")
    .setDescription("add gif with option of name!")
    .addStringOption(option =>
        option.setName('name')
            .setDescription('name of the GIF')
            .setRequired(true)
    )
    .addStringOption(option =>
        option.setName('url')
            .setDescription('URL of GIF')
            .setRequired(true)
    ),
    async execute(interaction) {
        const name = interaction.options.getString('name')
        module.exports.name = name
        const url = interaction.options.getString('url')
        if(!url.startsWith('https://')){
            interaction.reply('Please provide a valid URL')
            return
        }
        Gif.findOne({guild_id: interaction.guild.id}, (err, settings) => {
            if (err) {
                console.log(err)
                interaction.reply({ embeds: [gif_fail] })
                return
            }else {
                settings = new Gif({
                    guild_id: interaction.guild.id,
                    gif_name: name,
                    gif_url : url,                       
                })
            } 
            settings.save(err => {
                if (err) {
                    console.log(err)
                    interaction.reply({ embeds: [gif_fail] })
                    return
                }
            })
        })
        interaction.reply({ embeds: [gif_success] })
        .catch(console.error)
    }
}