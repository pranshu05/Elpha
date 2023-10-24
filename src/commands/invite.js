const { SlashCommandBuilder } = require('@discordjs/builders')
const { EmbedBuilder } = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('invite')
        .setDescription('Invite Link for Elpha'),
    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setTitle('Invite Link for Elpha')
            .setColor(0x0099FF)
            .setTimestamp()
            .addFields({
                name: 'Invite link:',
                value: `[Here](https://discord.com/api/oauth2/authorize?client_id=916613852362330133&permissions=8&scope=bot%20applications.commands) | Thanks for inviting Elpha!`,
            })
        interaction.reply({ embeds: [embed] })
    },
}
