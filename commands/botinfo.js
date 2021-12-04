const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('botinfo')
		.setDescription('Gets the bot\'s information'),
	async execute(client, interaction) {

        let days = Math.floor(client.uptime / 86400000 ); let hours = Math.floor(client.uptime / 3600000 ) % 24; let minutes = Math.floor(client.uptime / 60000) % 60; let seconds = Math.floor(client.uptime / 1000) % 60;
		
        let info = new MessageEmbed()
        .setAuthor(`Information about Elpha`, client.user.displayAvatarURL())
        .setDescription("Emojis provided by [Icons](https://discord.gg/9AtkECMX2P)")
        .setColor('RANDOM')
        .addField("Info", `\`\`\`yml\nName: ${client.user.tag}\nID: ${client.user.id}\n\`\`\``, true)
        .addField("Version", "```yml\nv1.0.0[BETA]\n```")
        .addField("Guilds", `\`\`\`yml\n${client.guilds.cache.size}\n\`\`\``, true)
        .addField("Uptime", `\`\`\`yml\n${days}d, ${hours}h, ${minutes}m, ${seconds}s\n\`\`\``)
        
        .addField("Github", "[Click here](https://github.com/pranshu05/Elpha)")

        try{
           await interaction.reply({ embeds: [info] })
              }catch(e){
                return;
              }

    }
};
