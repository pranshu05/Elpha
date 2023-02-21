const Discord = require('discord.js');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

module.exports = {
  name: 'guildCreate',
  async execute(guild, client) {
    // Being sent to joined server
    const channel = guild.channels.cache.find(
      (channel) =>
        channel.type === 'GUILD_TEXT' &&
        channel.permissionsFor(guild.me).has('SEND_MESSAGES')
    );

    const repo = new MessageActionRow().addComponents(
      new MessageButton()
        .setLabel('Github Repository')
        .setURL('https://github.com/pranshu05/elpha')
        .setStyle('LINK')
    );

    const ser = new MessageActionRow().addComponents(
      new MessageButton()
        .setLabel('Support Server')
        .setURL('https://discord.gg/CVyx9qyYPF')
        .setStyle('LINK')
    );

    const web = new MessageActionRow().addComponents(
      new MessageButton()
        .setLabel('Website')
        .setURL('https://elphabot.github.io')
        .setStyle('LINK')
    );

    const embed = new Discord.MessageEmbed()
      .setColor('00FFFF')
      .setTitle('Hello I am Elpha,thanks for choosing me!')
      .setDescription(
        `**I'm an open-source discord bot! Developed by contributors.Contribute to my code to Make me more powerful 💪🏻**`
      )
      .addFields(
        { name: 'Setup instructions', value: '👇' },
        {
          name: 'Setup Welcome Channel',
          value: '**Use Slashcommand**\n  ```/setwelcomechannel```',
        },
        {
          name: 'Setup General Channel',
          value: '**Use Slashcommand**\n  ```/setgeneralchannel```',
        },
        {
          name: 'Setup Modlogs Channel',
          value: '**Use Slashcommand**\n  ```/setmodlogchannel```',
        },
        {
          name: 'Setup Goodbye Channel',
          value: '**Use Slashcommand**\n  ```/setgoodbyechannel```',
        },
        {
          name: 'Create Default Role',
          value: '**Use Slashcommand**\n  ```/setdefaultrole```',
        }
      )
      .setTimestamp();

    channel
      .send({ embeds: [embed], components: [repo, ser, web] })
      .catch((err) => console.log(err));

    // Being sent to Elpha Server
    const guild_embed = new MessageEmbed()
      .setColor('00FFFF')
      .setTitle('New Guild!')
      .setDescription(`Elpha has joined the server ${guild.name}`)
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

    const new_channel = client.channels.cache.get('919799899929841694');
    new_channel.send({ embeds: [guild_embed] });

    console.log(`Server joined: ${guild.name}`);
  },
};
