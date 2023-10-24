const { SlashCommandBuilder } = require('@discordjs/builders')
const { EmbedBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('flip')
    .setDescription('Flip a Coin'),
    async execute(interaction) {
        let flip = [
            'tails',
            'heads',
        ]
        let index = (Math.floor(Math.random() * Math.floor(flip.length)))
        const embed = new EmbedBuilder()
        .setColor('00FFFF')
        .setTitle(flip[index])
        .setFooter({text: `Flipped for ${interaction.user.username}`})
        await interaction.reply({ embeds: [embed] })
        .catch(console.error)
    }
}