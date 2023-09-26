require("dotenv").config()
const fs = require("fs")
const { Client, GatewayIntentBits, Collection } = require("discord.js")
const Database = require("./config/Database")

//Connecting to MongoDB
const db = new Database()
db.connect()
const client = new Client({
  intents: [GatewayIntentBits.Guilds],
})

//Command handler
const commandFiles = fs
  .readdirSync("./src/commands")
  .filter((file) => file.endsWith(".js"))
const commands = []

//deploying commands in Discord's API
client.commands = new Collection()
for (const file of commandFiles) {
  const command = require(`./commands/${file}`)
  commands.push(command.data.toJSON())
  client.commands.set(command.data.name, command)
}

//Event Handler
const eventFiles = fs
  .readdirSync("./src/events")
  .filter((file) => file.endsWith(".js"))
for (const file of eventFiles) {
  const event = require(`./events/${file}`)
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args, commands))
  } else {
    client.on(event.name, (...args) => event.execute(...args, commands))
  }
}

client.login(process.env.token)
