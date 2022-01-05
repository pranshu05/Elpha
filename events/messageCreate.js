const General = require("../models/General")
const Discord = require('discord.js')
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
        question = ["why","when","where","whome", "which","How"],
        greeeting = ["hi","hello","sup","whatsup","Hi","Hello","Sup","Whatsup"],
        bye = ["bye","gtg","see u later","see u","seeya","gotta go"],
        yes=["yes ","yeah ","ye","really","jokin","kidding"],
        no=["no","nah","you know what"],
        elpha =["Elpha","elpha"],
        shut=["stfu","shut up","shut","shut the fuck up"],
        bw=["fuck","bitch","shit","piss off","asshole","dick head","basterd","ass","dick"],
        gn=["good night","gn"],
        gm=["good morning","morning","gm"],
        good=["good",'nice',"pog","excelent","genius","gud","nic"],
        thanks=["thank","thx"],
        lol=["lmao","lmfao","lol","rofl"],
        ded=["ded chat","ded","dead","dead chat"],
        have=["I have","have","i have","i hav"],
        u=["u r","no u","you r","no you","you are"],
        rick=['rick','rick roll','Rick','Rick rolled'],
        ng=['never gonna','Never gonna','Never Gonna']
        if(msg.channel.id === general.general_channel_id){
          if (greeeting.some(word => msg.content.startsWith(word))) {
            msg.reply('hello! How r you?')
          }
          if (question.some(word => msg.content.startsWith(word))) {
            msg.reply('Why are u asking me?')
          }
          if (bye.some(word => msg.content.startsWith(word))) {
            msg.reply('bye!')
          }
          if (yes.some(word => msg.content.startsWith(word))) {
            msg.reply('no')
          }
          if (no.some(word => msg.content.startsWith(word))) {
            msg.reply('yes')
          }
          if (elpha.some(word => msg.content.startsWith(word))) {
            msg.reply('yes?')
          }
          if (shut.some(word => msg.content.includes(word))) {
            msg.reply('you shut the fuck up')
          }
          if (bw.some(word => msg.content.includes(word))) {
            msg.reply('mind your language mf')
          }
          if (gm.some(word => msg.content.startsWith(word))) {
            msg.reply('Good Morning!')
          }
          if (gn.some(word => msg.content.startsWith(word))) {
            msg.reply('Good Night!')
          }
          if (good.some(word => msg.content.includes(word))) {
            msg.reply('thanks!')
          }
          if (thanks.some(word => msg.content.startsWith(word))) {
            msg.reply('welcome!')
          }
          if (lol.some(word => msg.content.startsWith(word))) {
            msg.reply('lmao')
          }
          if (ded.some(word => msg.content.startsWith(word))) {
            msg.reply('Now Alive!')
          }
          if (u.some(word => msg.content.startsWith(word))) {
            msg.reply('No you')
          }
          if (have.some(word => msg.content.startsWith(word))) {
            msg.reply('I have money :sunglasses:')
          }
          if (rick.some(word => msg.content.includes(word))) {
            msg.reply('Never Gonna Give You Up')
          }
          if (ng.some(word => msg.content.startsWith(word))) {
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