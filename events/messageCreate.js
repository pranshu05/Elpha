const General = require("../models/General")
const Discord = require('discord.js')
const fetch = require('node-fetch')

module.exports = {
    name: "messageCreate",
    async execute(message){
        const msg = message
        if(!message) return
        if (msg.author.bot) return
        const general = await General.findOne({guild_id: msg.guild.id})
		if (!general) {
            return
        }else{
        elpha =["Elpha","elpha"]
      
        if(msg.channel.id === general.general_channel_id){
          fetch(`https://api.monkedev.com/fun/chat?msg=${message.content}&uid=${message.author.id}`)
          .then(response => response.json())
          .then(data =>{
             message.reply(data.response)
          })
         
          if (elpha.some(word => msg.content.includes(word))) {
            msg.reply('yes?')
          }
        }else{
          return
        }
    }
  }
}