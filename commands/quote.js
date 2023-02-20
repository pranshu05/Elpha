const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('quote')
    .setDescription('sends rendom quote'),
  async execute(interaction) {
    let url = `https://type.fit/api/quotes`;
    let response = await fetch(url);
    let json = await response.json();
    let url_index = Math.floor(Math.random() * json.length);
    let random_quote = json[url_index].text;
    let random_author = json[url_index].author;
    interaction.reply(`**${random_quote}** -${random_author}`);
  },
};
