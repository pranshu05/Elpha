require("dotenv").config()
const fs = require("fs")
const {Client,Collection} = require("discord.js")
const Database = require("./config/Database")
const db = new Database()
db.connect()
const { MessageEmbed } = require('discord.js')
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
        'GUILD_PRESENCES',
    ] 
})
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))
const commands = []
client.commands = new Collection()
for (const file of commandFiles) {
	const command = require(`./commands/${file}`)
    commands.push(command.data.toJSON())
	client.commands.set(command.data.name, command)
}
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'))
for (const file of eventFiles) {
	const event = require(`./events/${file}`)
    if (event.once){
        client.once(event.name, (...args) => event.execute(...args, commands))
    } else {
        client.on(event.name, (...args) => event.execute(...args, commands))
    }
}
client.on('guildCreate' , guild => {   
    const embed = new MessageEmbed()
    .setColor("00FFFF")
    .setTitle("New Guild!")
    .setDescription(`Elpha has joined the server ${guild.name}`)
    .addField('Members:' , `${guild.memberCount.toString()}`)
    .addField("Guild owner:", `> <@${guild.ownerId}> \`[${guild.ownerId}]\``)
    .addField('Total servers:', `${client.guilds.cache.size.toString()}`)
    .setThumbnail(guild.iconURL())
    .setTimestamp()
		client.channels.cache.get("919799899929841694").send(
				{
					 embeds: [embed]
			})	
})
client.on('guildDelete' , guild => {
    const embed = new MessageEmbed()
    .setColor("00FFFF")
    .setTitle("Guild Left")
    .setDescription(`Elpha has left the server ${guild.name}`)
    .addField('Members:' , `${guild.memberCount.toString()}`)
    .addField("Guild owner:", `> <@${guild.ownerId}> \`[${guild.ownerId}]\``)
    .addField('Total servers:', `${client.guilds.cache.size.toString()}`)
    .setThumbnail(guild.iconURL())
    .setTimestamp()
		client.channels.cache.get("919799899929841694").send(
				{
					 embeds: [embed]
			})	
})
client.login(process.env.token)