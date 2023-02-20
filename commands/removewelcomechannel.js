const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions } = require('discord.js');
const Discord = require('discord.js');

const GuildSettings = require('../models/GuildSettings');
const Modlog = require('../models/Modlog');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('removewelcomechannel')
    .setDescription('Remove the welcome message channel'),
  async execute(interaction) {
    const insf_perms = new Discord.MessageEmbed()
      .setColor('#FF0000')
      .setTitle(`**:x: Insufficient Permission!**`)
      .setDescription(`You don't have permission to use this command.`);
    const wc_rem_embed = new Discord.MessageEmbed()
      .setColor('#00ff00')
      .setTitle(`**:white_check_mark: Removed Welcome Channel**`);
    const wc_rem_db_fail = new Discord.MessageEmbed()
      .setColor('#FF0000')
      .setTitle(`**:x: DataBase Error!**`)
      .setDescription(
        `An error occurred while removing channel data from database!`
      );
    const modlog_perms = new Discord.MessageEmbed()
      .setColor('#FF0000')
      .setTitle(`**:x: Message Error!**`)
      .setDescription(
        `I don't have permission to send message in modlogs channel!`
      );
    const modlog = await Modlog.findOne({ guild_id: interaction.guild.id });
    const channel = await GuildSettings.find({
      guild_id: interaction.guild.id,
    });
    if (
      !interaction.member.permissions.has([
        Permissions.FLAGS.MANAGE_CHANNELS,
        Permissions.FLAGS.MANAGE_MESSAGES,
        Permissions.FLAGS.MANAGE_ROLES,
        Permissions.FLAGS.ADMINISTRATOR,
      ])
    ) {
      interaction.reply({ embeds: [insf_perms] });
      return;
    }
    if (channel.length === 0) {
      interaction.reply(`There isn't any welcome channel in this server!`);
      return;
    }
    GuildSettings.deleteOne(
      { guild_id: interaction.guild.id },
      (err, settings) => {
        if (err) {
          console.log(err);
          interaction.reply({ embeds: [wc_rem_db_fail] });
          return;
        }
        if (!settings) {
          interaction.reply({ embeds: [wc_rem_db_fail] });
          return;
        }
        interaction.reply({ embeds: [wc_rem_embed] });
      }
    );
    if (!modlog) {
      return;
    } else {
      const abc = interaction.guild.channels.cache.get(
        modlog.modlog_channel_id
      );
      if (
        !interaction.guild.me
          .permissionsIn(abc)
          .has(Discord.Permissions.FLAGS.SEND_MESSAGES)
      ) {
        if (
          interaction.guild.me
            .permissionsIn(interaction.channel)
            .has(Discord.Permissions.FLAGS.SEND_MESSAGES)
        ) {
          interaction.channel.send({ embeds: [modlog_perms] });
          return;
        }
        return;
      }
      abc.send(`Welcome chnnel has been removed by ${interaction.user}`);
    }
  },
};
