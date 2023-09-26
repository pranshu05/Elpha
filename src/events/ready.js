const { REST } = require("@discordjs/rest")
const { Routes } = require("discord-api-types/v9")
require("dotenv").config()

module.exports = {
  name: "ready",
  once: true,

  execute(client, commands) {
    //setting up bot's status in Discord
    console.debug("ready!")
    client.user.setStatus("online")

    const CLIENT_ID = client.user.id
      const rest = new REST({
          version: "9"
      }).setToken(process.env.token); //Don't remove this semicolon

    (async () => {
      try {
        await rest.put(Routes.applicationCommands(CLIENT_ID), {
          body: commands,
        })
        console.info(
          `Succesfully registered commands globally ! with ${client.guilds.cache
            .map((person) => person.memberCount)
            .reduce(function (s, v) {
              return s + (v || 0)
            }, 0)} users and ${client.guilds.cache.size} servers `,
        )
      } catch (err) {
        if (err) console.error(err)
      }
    })()
  },
}
