const General = require('../models/General')
const fetch = require('node-fetch').default
const Discord = require('discord.js')
const Gif = require('../models/Gif')
module.exports = {
    name: 'messageCreate',
    async execute(message, client){
        const prefix = 'elp'
        const msg = message
        const args = message.content.slice(prefix.length).trim().split(' ')
        const command = args.shift().toLowerCase()
        if(!msg) return
        if(msg.author.bot) return
        const general = await General.findOne({guild_id: msg.guild.id})
        const gif =  await Gif.find({guild_id: msg.guild.id})
          if(message.content === `<@916613852362330133>`){
                await message.reply(`${message.author}, Don't ping :eyes:`).then(ping =>{
                message.reply(`${message.author}`)
            })
          }
          if(command === 'gif'){
            if(!gif){
              return
            }else{
              if(!args.length){
                  return message.channel.send(`You didn't provide any arguments, ${message.author}!`)
              }else{
                  const name = await Gif.findOne({guild_id: msg.guild.id , gif_name: args[0]})
                  if(!name){
                      msg.reply(`No GIF found named `+ args[0])
                  }else{
                      const url = name.gif_url
                      msg.reply(url)
                  }
                }
              }
          }
          if(command === 'leave'){
              if(message.author.id !=='754381104034742415') 
                return message.channel.send(`**»** ${message.author}, you don't have permission to do that!`);
                message.guild.leave()
          }
          if(command === 'eval'){
            const code = args[0]
            let evaled = eval(code)
            if(typeof evaled !== "string") evaled = require("util").inspect(evaled)
            if(evaled.length > 1024) evaled = `Evaluated value is too big to display!`
            const insf_perms = new Discord.MessageEmbed()
            .setColor('#FF0000')
            .setTitle(`**:x: Insufficient Permission!**`)
            .setDescription(`You don't have permission to use this command.Only owner of this bot can use this command!`)
            const embed = new Discord.MessageEmbed()
            .setColor('#00FFFF')
            .setTitle('Evaluated successsfully!')
            .addFields(
                {name: 'To evaluate',value: `\`\`\`js\n ${code}\`\`\``},
                {name: 'Evaluated', value: `\`\`\`${evaled}\`\`\``},
            )
            .setTimestamp()
            .setFooter(message.client.user.username, message.client.user.displayAvatarURL())
            try{
              if(!message.author.id === '754381104034742415'){
                return message.reply({embeds: [insf_perms]})
              }else{
                if(!args.length){
                  return message.channel.send(`You didn't provide any arguments, ${message.author}!`)
                }else{
                  if(message.content.includes('token')) return message.reply('Using eval command for token is dangerous!')
                  me.reply({embeds: [embed]})
                }
              }
            }catch(e){
              if (e.length > 1024) e = `The error is too big to display!`
              const eval_err = new Discord.MessageEmbed()
              .setColor('#FF0000')
              .setTitle('An Error occured while evaluating the code!')
              .setDescription(`\`ERROR\` \`\`\`xl\n${e}\n\`\`\``)
              .setFooter(message.client.user.username, message.client.user.displayAvatarURL())
              message.reply({embeds: [eval_err]})
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
