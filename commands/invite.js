const { SlashCommandBuilder } = require('@discordjs/builders')
const Discord = require('discord.js')
module.exports = {
    data: new SlashCommandBuilder()
        .setName('invite')
        .setDescription('Invite Link for Elpha'),
    async execute(interaction) {
        const embed = new Discord.MessageEmbed()
            .setColor('#00ffff')
            .setTimestamp()
            .setFooter(`Invite Link for Elpha`)
            .addField('Invite link:', `[Here](https://discord.com/api/oauth2/authorize?client_id=916613852362330133&permissions=8&scope=bot%20applications.commands) | Thanks for inviting Elpha!`)
        interaction.reply({ embeds: [embed] })
    }
}