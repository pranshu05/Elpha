const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require('discord.js')
const Gif = require("../models/Gif")
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
        const url = interaction.options.getString('url')
        if(!url.startsWith('https://')){
            interaction.reply('Please provide a valid URL')
            return
        }
        Gif.findOne({guild_id: interaction.guild.id}, (err, settings) => {
            if (err) {
                console.log(err)
                interaction.reply("An error occurred while adding gif to database!")
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
                    interaction.reply("An error occurred while adding gif to database!")
                    return
                }
            })
        })

        interaction.reply(`GIF named `+ name +` added!\n` + `type **elp gif **`+name +` to send gif\n` + `You can undo this by **/removegif** command`)
    }
}