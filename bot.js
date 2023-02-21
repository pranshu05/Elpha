require('dotenv').config();
const fs = require('fs');
const { Client, Collection, MessageEmbed } = require('discord.js');
const Database = require('./config/Database');
const db = new Database();
db.connect();

const client = new Client({
  intents: [
    'GUILDS',
    'GUILD_MEMBERS',
    'GUILD_MESSAGES',
    'GUILD_MESSAGE_REACTIONS',
    'GUILD_MESSAGE_TYPING',
    'GUILD_BANS',
    'GUILD_EMOJIS_AND_STICKERS',
    'GUILD_INTEGRATIONS',
    'GUILD_INVITES',
    'GUILD_VOICE_STATES',
  ],
});

const commandFiles = fs
  .readdirSync('./commands')
  .filter((file) => file.endsWith('.js'));

const commands = [];
client.commands = new Collection();

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  commands.push(command.data.toJSON());
  client.commands.set(command.data.name, command);
}

const eventFiles = fs
  .readdirSync('./events')
  .filter((file) => file.endsWith('.js'));

for (const file of eventFiles) {
  const event = require(`./events/${file}`);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args, commands));
  } else {
    client.on(event.name, (...args) => event.execute(...args, commands));
  }
}

client.on('guildDelete' , guild =>{
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
})

client.on('guildCreate' , guild =>{
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
})

client.login(process.env.token);
