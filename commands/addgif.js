const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require('discord.js')
const Gif = require("../models/Gif")
module.exports = {
    data: new SlashCommandBuilder()
    .setName("addgif")
    .setDescription("add gif with option of name!")
    .addStringOption(option => option.setName('name').setDescription('name of the GIF').setRequired(true)) 
    .addStringOption(option => option.setName('url').setDescription('URL of GIF').setRequired(true)),
    async execute(interaction) {
        const name = interaction.options.getString('name')
        const url = interaction.options.getString('url')
        const gif = Gif.findOne({guild_id: interaction.guild.id , gif_name: name})
        const gif_success = new Discord.MessageEmbed().setColor('#00FF00')
	    .setTitle('**:white_check_mark: GIF added**')
        .setDescription(`GIF named `+ name +` added!\n` + `type elp gif `+name +` to send gif\n` + `You can undo this by **/removegif** command`)
        const gif_fail = new Discord.MessageEmbed()
        .setColor('#FF0000')
	    .setTitle(`**:x: Couldn't add GIF**`)
        .setDescription(`An error occurred while adding gif to database!`)
        if(!url.startsWith('https://')){ 
            interaction.reply('Please provide a valid URL')
            return
        }
        if(gif){
            interaction.reply(`Gif named **${name}** already exist in this server! Please select another name.`)
        }
        Gif.findOne({guild_id: interaction.guild.id}, (err, settings) => {
            if(err){
                console.log(err)
                interaction.reply({ embeds: [gif_fail] })
                return
            }else{
                settings = new Gif({
                guild_id: interaction.guild.id,
                gif_name: name,
                gif_url : url,                       
                })
            } 
            settings.save(err => {
                if(err){
                    console.log(err)
                    interaction.reply({ embeds: [gif_fail] })
                    return
                }
            })
        })
        interaction.reply({ embeds: [gif_success] }).catch(console.error)
    }
}