const Discord = require("discord.js")
const {REST} = require("@discordjs/rest")
const {Routes} = require("discord-api-types/v9")
const dotenv = require("dotenv")
dotenv.config()

const version = "9"
const CLIENT_ID = process.env.CLIENT_ID
const rest = new REST({version}).setToken(process.env.TOKEN)

const registerCommands = async (client, commands) => {
    try {
        await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });
        console.debug(`Succesfully registered commands globally`);
    } catch (err) {
        console.error(err);
    }
}

module.exports = {
    name: "ready",
    once: true,
    async execute(client) {
        console.debug('Bot is ready!');
        client.user.setStatus('dnd')
        const watching = [
            `Pranshu developing me 👀`,
            `Over ${client.guilds.cache.size} servers`,
            `Over ${client.guilds.cache.map(person => person.memberCount).reduce(function (s, v) { return s + (v || 0) }, 0)} users`,
            `Pranshu developing me 👀`
        ]
          let index = 0
        setInterval(() => {
        if(index === watching.length) index = 0
        const status = watching[index]
        client.user.setStatus('dnd')
        client.user.setActivity(status, { type: "WATCHING"})
        index++
    }, 7000) 

       await registerCommands(client, commands);
    }
}
