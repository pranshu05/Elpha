const { SlashCommandBuilder } = require("@discordjs/builders");
const  Discord  = require("discord.js");
const moment = require('moment');

module.exports = {
    data: new SlashCommandBuilder()
    .setName("userinfo")
    .setDescription("user's info!"),
    
    async execute(interaction){

        const member = interaction.guild.member(user);
        const infoEmbed = new Discord.MessageEmbed()
        .setColor("00FFFF")
        .setThumbnail(interaction.author.avatarURL)
        .addField(`${user.tag}`, `${user}`, true)
        .addField("ID:", `${user.id}`, true)
        .addField("Nickname:", `${member.nickname !== null ? `${member.nickname}` : 'None'}`, true)
        .addField("Status:", `${user.presence.status}`, true)
        .addField("In Server", interaction.guild.name, true)
        .addField("Game:", `${user.presence.game ? user.presence.game.name : 'None'}`, true)
        .addField("Bot:", `${user.bot}`, true)
        .addField("Joined The Server On:", `${moment.utc(member.joinedAt).format("dddd, MMMM Do YYYY")}`, true)
        .addField("Account Created On:", `${moment.utc(user.createdAt).format("dddd, MMMM Do YYYY")}`, true) 
        .addField("Roles:", member.roles.map(roles => `${roles}`).join(', '), true)
        .setFooter(`Replying to ${interaction.author.username}#${interaction.author.discriminator}`)

        interaction.reply({
            embeds: [infoEmbed] 
        })
    }
}
