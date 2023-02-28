const { SlashCommandBuilder } = require('@discordjs/builders')
module.exports = {
    data: new SlashCommandBuilder()
    .setName('gay')
    .setDescription('gay someone')
    .addUserOption(option => option.setName('user').setDescription('gay user').setRequired(true)),
    async execute(interaction) {
        const user = interaction.options.getUser('user')
        if (user.id === '754381104034742415') return interaction.reply('My developer isnt Gay')
        if (user === interaction.client.user) return interaction.reply('im not gay')
        interaction.reply(`${user} imagine being a nerd`)
    }
}