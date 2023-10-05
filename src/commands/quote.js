const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("quote")
        .setDescription("Quote a message")
        .addStringOption((option) =>
            option
                .setName("message")
                .setDescription("The message to quote")
                .setRequired(true)
        ),
    async execute(interaction) {
        const message = interaction.options.getString("message");

        // Fetch a random quote from the API
        const response = await fetch("https://api.quotable.io/random");
        const quote = await response.json();

        const embed = new MessageEmbed()
            .setDescription(`"${message}"`)
            .addField("Quote", `"${quote.content}" - ${quote.author}`)
            .setColor("#00ffff");

        await interaction.reply({ embeds: [embed] });
    },
};