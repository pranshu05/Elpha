const { SlashCommandBuilder } = require('discord.js')
const { EmbedBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('Display the avatar of the user')
        .addUserOption((option) =>
            option
                .setName(`user`)
                .setDescription(`Select a user`)
                .setRequired(false)
        ),
    async execute(interaction) {
        const userMention =
            interaction.options.getUser(`user`) || interaction.user
        const avatar = userMention.displayAvatarURL({
            size: 1024,
            extension: 'png',
        })

        const embed = new EmbedBuilder()
            .setColor('#00ffff')
            .setAuthor({
                name: `${userMention.tag}'s avatar`,
                iconURL: `${userMention.displayAvatarURL()}`,
                url: `https://discord.com/users/${userMention.id}`
            })
            .setTitle(`Download`)
            .setURL(avatar)
            .setImage(avatar)

        const message = await interaction.reply({ embeds: [embed] })
    },
}
