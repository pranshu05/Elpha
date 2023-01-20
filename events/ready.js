const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
require("dotenv").config();

const watching = [
    "Pranshu developing me 👀",
    `Over ${client.guilds.cache.size} servers`,
    `Over ${client.guilds.cache.map((person) => person.memberCount).reduce((s, v) => s + (v || 0), 0)} users`,
    "Pranshu developing me 👀",
];

module.exports = {
    name: "ready",
    once: true,
    execute(client, commands) {
        console.log("Ready!");

        // Set the bot's activity status
        let index = 0;
        setInterval(() => {
            if (index === watching.length) index = 0;
            const status = watching[index];
            client.user.setStatus("dnd");
            client.user.setActivity(status, { type: "WATCHING" });
            index++;
        }, 7000);

        // Register commands globally
        const CLIENT_ID = client.user.id;
        const rest = new REST({ version: "9" }).setToken(process.env.token);
        (async () => {
            try {
                await rest.put(Routes.applicationCommands(CLIENT_ID), {
                    body: commands,
                });
                console.log(
                    `Successfully registered commands globally with ${client.guilds.cache.map((person) => person.memberCount).reduce((s, v) => s + (v || 0), 0)} users and ${client.guilds.cache.size} servers`
                );
            } catch (err) {
                console.error(err);
            }
        })();
    },
};

