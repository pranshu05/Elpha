const { SlashCommandBuilder } = require("@discordjs/builders")
const { Interaction } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("echo")
    .setDescription("Echoes your inputs!")
    .addStringOption(option => 
        option
        .setName("message")
        .setDescription("The message to Echo")
        .setRequired(true)
        ),
    async execute(interaction){
        interaction.reply({
            content: interaction.options.getString("message")
        })
    }
}