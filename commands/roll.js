const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('roll')
        .setDescription('Roll a dice'),
    async execute(interaction) {
        const diceNum = Math.floor(Math.random() * 6) + 1
        interaction.reply(diceNum.toString())
    }
}