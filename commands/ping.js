const { SlashCommandBuilder } = require('@discordjs/builders')
const Discord = require('discord.js')
module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Pong!'),
    async execute(interaction) {
        const embed = new Discord.MessageEmbed()
        .setColor('#00ffff')
        .setTimestamp()
        .setTitle(`Pong 🏓`)
        .addFields(
            {name: 'Latancy:', value: `\`\`\`${(interaction.client.ws.ping).toFixed(0)} ms\`\`\``, inline: true},
            {name: 'API Latancy:', value: `\`\`\`${Date.now() - interaction.createdTimestamp} ms\`\`\``, inline: true}
          )
        .setFooter({text: `counted for ${interaction.user.username}`})
        interaction.reply({ embeds: [embed] })
    }
}