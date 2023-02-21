const Discord = require('discord.js');

const Leave = require('../models/Leave');

module.exports = {
  name: 'guildMemberRemove',
  async execute(member, guild) {
    console.log(`${member.user.username} left ${member.guild.name}`);

    const guildSettings = await Leave.findOne({ guild_id: member.guild.id });

    if (!guildSettings) {
      return;
    } else {
      const newMemberEmbed = new Discord.MessageEmbed()
        .setColor('00FFFF')
        .setTitle('Member left')
        .setDescription(`${member.user} left the srver`)
        .setThumbnail(member.user.displayAvatarURL())
        .setTimestamp();
      if (
        !member.guild.me
          .permissionsIn(guildSettings.goodbye_channel_id)
          .has(Discord.Permissions.FLAGS.SEND_MESSAGES)
      ) {
        return console.log('Couldnt send msg');
      }

      member.guild.channels.cache.get(guildSettings.goodbye_channel_id).send({
        embeds: [newMemberEmbed],
      });
    }
  },
};
