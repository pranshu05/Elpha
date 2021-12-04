const { SlashCommandBuilder } = require("@discordjs/builders");
const { Interaction } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Pong!"),
    async execute(interaction){
        interaction.reply("Pong!")
    }
}