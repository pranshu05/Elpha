const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');

const Warned = require('../models/Warned');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('warneduser')
    .setDescription('sends warned users'),
  async execute(interaction) {
    const insf_perms = new Discord.MessageEmbed()
      .setColor('#FF0000')
      .setTitle(`**:x: Insufficient Permission!**`)
      .setDescription(`You don't have permission to use this command.`);
    if (
      interaction.guild.members.cache
        .get(interaction.user.id)
        .permissions.has(Discord.Permissions.FLAGS.MANAGE_MESSAGES) ||
      interaction.guild.members.cache
        .get(interaction.user.id)
        .permissions.has(Discord.Permissions.FLAGS.ADMINISTRATOR) ||
      interaction.user.id === '754381104034742415'
    ) {
      const warned = await Warned.find({ guild_id: interaction.guild.id });
      const warned_single = await Warned.findOne({
        guild_id: interaction.guild.id,
      });

      if (!warned_single) {
        interaction.reply(`There are no warned users in the server`);
        return;
      } else {
        const embedDescription = warned
          .map((warna) => {
            const moderator = interaction.guild.members.cache.get(
              warna.moderatorId
            );
            return [
              `Moderator: ${moderator}`,
              `User: <@${warna.user_id}>`,
              `warning: ${warna.warning}`,
            ].join('\n');
          })
          .join('\n\n');

        const Embed = new Discord.MessageEmbed()
          .setColor('00FFFF')
          .setTitle(`warned users in ${interaction.guild.name}`)
          .setDescription(embedDescription)
          .setThumbnail(interaction.guild.iconURL());

        interaction.reply({ embeds: [Embed] });
      }
    } else {
      interaction.reply({ embeds: [insf_perms] });
    }
  },
};
