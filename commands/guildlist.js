const { SlashCommandBuilder } = require('@discordjs/builders')
module.exports = {
    data: new SlashCommandBuilder()
    .setName('guild_list')
    .setDescription('send list of guilds'),
    async execute(interaction) {
        const insf_perms = new Discord.MessageEmbed()
        .setColor('#FF0000')
	    .setTitle(`**:x: Insufficient Permission!**`)
        .setDescription(`You don't have permission to use this command.Only owner of this bot can use this command!`)
        if(interaction.user.id === '754381104034742415'){
        interaction.reply('Done!')
        console.log(interaction.client.guilds.cache
            .map(g => `Guild Name: ${g.name}\n  Total Members: ${g.members.cache.size}\n Guild ID: ${g.id}`).join('\n\n')
        ).catch(console.error)
        }else{
            interaction.reply({embeds: [insf_perms]})
        }
    }
}