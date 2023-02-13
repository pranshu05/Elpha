require("dotenv").config()
const fs = require("fs")
const {Client,Collection} = require("discord.js")
const Database = require("./config/Database")
const db = new Database()
db.connect()
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
    ] 
})
const { MessageEmbed } = require('discord.js')
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
    .addField('Members:' , `${guild.memberCount}`)
    .addField('Guild ID:' , `${guild.id}`)
    .addField("Guild owner:", `> <@${guild.ownerId}> \`[${guild.ownerId}]\``)
    .addField('Total servers:', `${client.guilds.cache.size}`)
    .setThumbnail(guild.iconURL())
    .setTimestamp()
		client.channels.cache.get("919799899929841694").send(
				{
					 embeds: [embed]
			})	
})
client.on('guildDelete' , guild => {
    if(guild.available){
        const embed = new MessageEmbed()
        .setColor("00FFFF")
        .setTitle("Guild Left")
        .setDescription(`Elpha has left the server ${guild.name}`)
        .addField('Members:' , `${guild.memberCount}`)
        .addField('Guild ID:' , `${guild.id}`)
        .addField("Guild owner:", `> <@${guild.ownerId}> \`[${guild.ownerId}]\``)
        .addField('Total servers:', `${client.guilds.cache.size}`)
        .setThumbnail(guild.iconURL())
        .setTimestamp()
            client.channels.cache.get("919799899929841694").send(
                    {
                         embeds: [embed]
                })	
    }
        
    })
client.on('interactionCreate' , interaction => {
    
    if(interaction.isSelectMenu()){
        const choice = interaction.values[0] 
        const member = interaction.member
        if(interaction.customID === 'roles') {
            console.log('some1 reacted!')
            if(choice === '1'){
                if (member.roles.cache.has('959447841355468801')) {
                    interaction.reply({content: "The role was successfully removed from you" , ephemeral: true})
                    member.roles.remove('959447841355468801')
                    .catch(console.error)
                }
                else{
                    member.roles.add('959447841355468801')
                    interaction.reply({ content: "The role was successfully added to you", ephemeral: true })
                    .catch(console.error)
                }
            }
            if(choice === '2'){
                if (member.roles.cache.has('959447841355468801')) {
                    interaction.reply({content: "The role was successfully removed from you" , ephemeral: true})
                    member.roles.remove('959447841355468801')
                    .catch(console.error)
                }
                else{
                    member.roles.add('959447841355468801')
                    interaction.reply({ content: "The role was successfully added to you", ephemeral: true })
                    .catch(console.error)
                }
            }
            if(choice === '3'){
                if (member.roles.cache.has('959447842282414130')) {
                    interaction.reply({content: "The role was successfully removed from you" , ephemeral: true})
                    member.roles.remove('959447842282414130')
                    .catch(console.error)
                }
                else{
                    member.roles.add('959447842282414130')
                    interaction.reply({ content: "The role was successfully added to you", ephemeral: true })
                    .catch(console.error)
                }
            }
            if(choice === '4'){
                if (member.roles.cache.has('959447842844467210')) {
                    interaction.reply({content: "The role was successfully removed from you" , ephemeral: true})
                    member.roles.remove('959447842844467210')
                    .catch(console.error)
                }
                else{
                    member.roles.add('959447842844467210')
                    interaction.reply({ content: "The role was successfully added to you", ephemeral: true })
                    .catch(console.error)
                }
            }
            if(choice === '5'){
                if (member.roles.cache.has('959447834254532658')) {
                    interaction.reply({content: "The role was successfully removed from you" , ephemeral: true})
                    member.roles.remove('959447834254532658')
                    .catch(console.error)
                }
                else{
                    member.roles.add('959447834254532658')
                    interaction.reply({ content: "The role was successfully added to you", ephemeral: true })
                    .catch(console.error)
                }
            }
            if(choice === '6'){
                if (member.roles.cache.has('959447834669752362')) {
                    interaction.reply({content: "The role was successfully removed from you" , ephemeral: true})
                    member.roles.remove('959447834669752362')
                    .catch(console.error)
                }
                else{
                    member.roles.add('959447834669752362')
                    interaction.reply({ content: "The role was successfully added to you", ephemeral: true })
                    .catch(console.error)
                }
            }
            if(choice === '7'){
                if (member.roles.cache.has('959447835181461554')) {
                    interaction.reply({content: "The role was successfully removed from you" , ephemeral: true})
                    member.roles.remove('959447835181461554')
                    .catch(console.error)
                }
                else{
                    member.roles.add('959447835181461554')
                    interaction.reply({ content: "The role was successfully added to you", ephemeral: true })
                    .catch(console.error)
                }
            }
            if(choice === '8'){
                if (member.roles.cache.has('959447835663802368')) {
                    interaction.reply({content: "The role was successfully removed from you" , ephemeral: true})
                    member.roles.remove('959447835663802368')
                    .catch(console.error)
                }
                else{
                    member.roles.add('959447835663802368')
                    interaction.reply({ content: "The role was successfully added to you", ephemeral: true })
                    .catch(console.error)
                }
            }
            if(choice === '9'){
                if (member.roles.cache.has('959447846166343740')) {
                    interaction.reply({content: "The role was successfully removed from you" , ephemeral: true})
                    member.roles.remove('959447846166343740')
                    .catch(console.error)
                }
                else{
                    member.roles.add('959447846166343740')
                    interaction.reply({ content: "The role was successfully added to you", ephemeral: true })
                    .catch(console.error)
                }
            }
            if(choice === '10'){
                if (member.roles.cache.has('959447845700767755')) {
                    interaction.reply({content: "The role was successfully removed from you" , ephemeral: true})
                    member.roles.remove('959447845700767755')
                    .catch(console.error)
                }
                else{
                    member.roles.add('959447845700767755')
                    interaction.reply({ content: "The role was successfully added to you", ephemeral: true })
                    .catch(console.error)
                }
            }
            if(choice === '11'){
                if (member.roles.cache.has('959447846745153586')) {
                    interaction.reply({content: "The role was successfully removed from you" , ephemeral: true})
                    member.roles.remove('959447846745153586')
                    .catch(console.error)
                }
                else{
                    member.roles.add('959447846745153586')
                    interaction.reply({ content: "The role was successfully added to you", ephemeral: true })
                    .catch(console.error)
                }
            }
        }else{
            return
        }
    }
})
client.login(process.env.token)
