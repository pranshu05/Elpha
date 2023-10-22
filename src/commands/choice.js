const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("choose")
        .setDescription("Elpha will choose for you!")
        .addSubcommand(subcommand => subcommand
            .setName("choices")
            .setDescription('choice')
            .addStringOption(option => option
                .setName('first')
                .setDescription('Enter the first choice')
                .setRequired(true)
            )
            .addStringOption(option => option
                .setName('second')
                .setDescription('Enter the second choice')
                .setRequired(true)
            )
        ),
    async execute(interaction) {
        const firstChoice = interaction.options.getString('first');
        const secondChoice = interaction.options.getString('second');

        const choose = [firstChoice, secondChoice];
        const chosenIndex = Math.floor(Math.random() * choose.length);

        const embed = new EmbedBuilder()
            .setColor('00FFFF')
            .setTitle('I choose ' + choices[chosenIndex])
            .addFields(
                { name: 'First choice', value: firstChoice },
                { name: 'Second choice', value: secondChoice }
            )
            .setFooter(`Chosen for ${interaction.user.username}`);

        await interaction.reply({ embeds: [embed] }).catch(console.error);
    }
};
