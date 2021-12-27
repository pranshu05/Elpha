const {REST} = require("@discordjs/rest");
const {Routes} = require("discord-api-types/v9");
require("dotenv").config();

module.exports = {
    name: "ready",
    once: true,
    execute(client, commands){
        console.log('ready!');

    client.user.setPresence({
        status: 'online',
        activities: [{ 
       name: `Pranshu developing me 👀`,
        type: "STREAMING",
        url: 'https://www.twitch.tv/pranshu2005'
        }
       ],
       },);

    const CLIENT_ID = client.user.id;

    const rest = new REST ({
        version : "9"
    }).setToken(process.env.token);

    (async ()  => {
        try{
            await rest.put(Routes.applicationCommands(CLIENT_ID), {
                body : commands
            });
            console.log("Succesfully registered commands globally !");
        } catch (err) {
          if (err)  console.error(err);
        }
    })();
    }
}