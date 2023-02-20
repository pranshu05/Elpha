const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions } = require('discord.js');
const Discord = require('discord.js');

const Modlog = require('../models/Modlog');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('setmodlogchannel')
    .setDescription('Set the modlog message channel')
    .addChannelOption((option) =>
      option
        .setName('modlog')
        .setDescription('The channel to set as the modlog channel')
        .setRequired(true)
    ),
  async execute(interaction) {
    const msg_perms = new Discord.MessageEmbed()
      .setColor('#FF0000')
      .setTitle(`**:x: Insufficient Permission!**`)
      .setDescription(
        `I don't have permission to send message in that channel.`
      );
    const insf_perms = new Discord.MessageEmbed()
      .setColor('#FF0000')
      .setTitle(`**:x: Insufficient Permission!**`)
      .setDescription(`You don't have permission to use this command.`);
    const invalid_channel = new Discord.MessageEmbed()
      .setColor('#FF0000')
      .setTitle(`**:x: Invalid Channel**`)
      .setDescription(`This command is only applicable for text channels`);
    const ml_embed = new Discord.MessageEmbed()
      .setColor('#00ff00')
      .setTitle(
        `**:white_check_mark: Modlog channel has been set to ${interaction.options.getChannel(
          'modlog'
        )}**`
      );
    const ml_db_fail = new Discord.MessageEmbed()
      .setColor('#FF0000')
      .setTitle(`**:x: DataBase Error!**`)
      .setDescription(
        `An error occurred while adding channel data to database!`
      );
    const modlog_perms = new Discord.MessageEmbed()
      .setColor('#FF0000')
      .setTitle(`**:x: Message Error!**`)
      .setDescription(
        `I don't have permission to send message in modlogs channel!`
      );

    const modlog = await Modlog.findOne({ guild_id: interaction.guild.id });

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

    if (interaction.options.getChannel('modlog').type !== 'GUILD_TEXT') {
      interaction.reply({ embeds: [invalid_channel] });
      return;
    }

    if (
      !interaction.guild.me
        .permissionsIn(interaction.options.getChannel('modlog'))
        .has(Discord.Permissions.FLAGS.SEND_MESSAGES)
    ) {
      interaction.reply({ embeds: [msg_perms] });
      return;
    }

    Modlog.findOne({ guild_id: interaction.guild.id }, (err, settings) => {
      if (err) {
        console.log(err);
        interaction.reply({ embeds: [ml_db_fail] });
        return;
      }

      if (!settings) {
        settings = new Modlog({
          guild_id: interaction.guild.id,
          modlog_channel_id: interaction.options.getChannel('modlog').id,
        });
      } else {
        settings.modlog_channel_id =
          interaction.options.getChannel('modlog').id;
      }

      settings.save((err) => {
        if (err) {
          console.log(err);
          interaction.reply({ embeds: [ml_db_fail] });
          return;
        }
        interaction.reply({ embeds: [ml_embed] });
      });

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
        abc.send({ embeds: [ml_embed] });
      }
    });
  },
};
