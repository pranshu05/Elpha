const { SlashCommandBuilder } = require("@discordjs/builders")
module.exports = {
    data: new SlashCommandBuilder()
    .setName("guild_list")
    .setDescription("send list of guilds"),
    async execute(interaction) {
        if(interaction.user.id === '754381104034742415'){
        console.log(interaction.client.guilds.cache
            .map(g => `Guild Name: ${g.name}\n  Total Members: ${g.members.cache.size}\n Guild ID: ${g.id}`).join('\n\n')
        ).then(
            interaction.reply('Done!')
        ).catch(console.error)
        }else {
            interaction.reply('Insufficant Permissions')
        }
    }
}