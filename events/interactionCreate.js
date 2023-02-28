const Discord = require('discord.js')
module.exports = {
    name: 'interactionCreate',
    async execute(interaction){
        const err_embed = new Discord.MessageEmbed()
        .setColor('FF0000')
        .setAuthor(
            {name: `Error Occured!`, iconURL: `${interaction.client.user.displayAvatarURL()}`}
        )
        .setTitle('An error occured while executing the command')
        .setImage('https://media.discordapp.net/attachments/1079259438566883349/1080014089163649094/image.png')
        .setTimestamp()
        if(!interaction.isCommand()) return interaction.reply(`interaction isn't a valid command!`)
        if(!interaction.guild) return interaction.reply(`You can use slash commands only in a server!`)
        const command = interaction.client.commands.get(interaction.commandName)
        if(!command) return
        try{
            await command.execute(interaction)
        }catch(err){
            if (err) console.error(err)
            await interaction.reply({
                embeds: [err_embed],
                ephemeral: true
            })
        }
    }
}
