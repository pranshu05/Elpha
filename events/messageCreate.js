const General = require("../models/General")
const Discord = require('discord.js')
const fetch = require('node-fetch').default
module.exports = {
    name: "messageCreate",
    async execute(message ,client){
        const msg = message
        if(!message) return
        if (msg.author.bot) return
        const general = await General.findOne({guild_id: msg.guild.id})
		if (!general) {
            return
        }else{
        question = ["why","when","where","whome", "which","how"],
        elpha =["elpha"],
        ded=["ded chat","ded","dead","dead chat"],
        have=["have","i have","i hav"],
        u=["u r","no u","you r","no you","you are"],
        rick=['rick','rick roll'],
        ng=['never gonna']
        if(msg.channel.id === general.general_channel_id){
          fetch(`https://api.monkedev.com/fun/chat?msg=${message.content}&uid=${message.author.id}`)
          .then(response => response.json())
          .then(data =>{
             message.reply(data.response)
          }).catch(()=>{
            message.reply('I have no reply for this!')
          })
          if (question.some(word => msg.content.toLowerCase().startsWith(word))) {
            msg.reply('Why are u asking me?')
          }
          if (elpha.some(word => msg.content.toLowerCase().startsWith(word))) {
            msg.reply('yes?')
          }
          if (ded.some(word => msg.content.toLowerCase().startsWith(word))) {
            msg.reply('Now Alive!')
          }
          if (u.some(word => msg.content.toLowerCase().startsWith(word))) {
            msg.reply('No you')
          }
          if (have.some(word => msg.content.toLowerCase().startsWith(word))) {
            msg.reply('I have money :sunglasses:')
          }
          if (rick.some(word => msg.content.toLowerCase().includes(word))) {
            msg.reply('Never Gonna Give You Up')
          }
          if (ng.some(word => msg.content.toLowerCase().startsWith(word))) {
            msg.reply('Give You Up')
          }
          if (message.mentions.has(client.user)) {
            message.reply(`Don't ping me mf, ${message.author}`);
          }
        }else{
          return
        }
    }
  }
} 