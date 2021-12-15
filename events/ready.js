require("dotenv").config();

module.exports = {
    name: "ready",
    once: true,
    execute(client){
        console.log('ready!');

    client.user.setPresence({
        status: 'idle',
        activities: [{ 
       name: `Pranshu developing me 👀`,
        type: "WATCHING",
        }
       ],
       },)

    }
}