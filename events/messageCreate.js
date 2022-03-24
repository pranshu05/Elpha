const General = require("../models/General")
const fetch = require('node-fetch').default
const Gif = require('../models/Gif')
module.exports = {
    name: "messageCreate",
    async execute(message){
        const msg = message
        const sts = `elp gif`
        if(!msg) return
        if(msg.author.bot) return
        if (!message.guild) return
        const general = await General.findOne({guild_id: msg.guild.id})
        const gif =  await Gif.find({guild_id: msg.guild.id})
        if (message.content.startsWith(sts+ args[0])) {
            if (!args[0]) {
              return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
            }else{
              console.log(args[0])
              const name = await Gif.findOne({guild_id: msg.guild.id , gif_name: args[0]})
              if(!name){
                msg.reply(`No GIF found named `+ args[0])
              }else{
                const url = name.gif_url
                msg.reply(url)
              }
            }
          
        }
		    if (!general) {
            return
        }else{
        if(msg.channel.id === general.general_channel_id){
          fetch(`http://api.brainshop.ai/get?bid=163720&key=wN0HGDiinarW8Rle&uid=${message.author.id}&msg=${message.content.toLowerCase()}`).then(res => res.json()).then(json => {
            const rep = json.cnt
            msg.channel.send(rep)
        }).catch(()=>{message.channel.send('API timeout')})
        }
    }
  }
} 
