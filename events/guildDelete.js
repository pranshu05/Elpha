module.exports = {
  name: 'guildDelete',
  async execute(guild, client) {
    if (!guild.available) return;

    // Being sent to Elpha server
    const embed = new MessageEmbed()
      .setColor('00FFFF')
      .setTitle('Guild Left')
      .setDescription(`Elpha has left the server ${guild.name}`)
      .addFields(
        { name: 'Members:', value: `${guild.memberCount}` },
        { name: 'Guild ID:', value: `${guild.id}` },
        {
          name: 'Guild owner:',
          value: `> <@${guild.ownerId}> \`[${guild.ownerId}]\``,
        },
        { name: 'Total servers:', value: `${client.guilds.cache.size}` }
      )
      .setThumbnail(guild.iconURL())
      .setTimestamp();

    const channel = client.channels.cache.get('919799899929841694');
    channel.send({ embeds: [embed] });

    console.log(`Server left: ${guild.name}`);
  },
};
