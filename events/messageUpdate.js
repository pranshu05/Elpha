const Discord = require('discord.js')
module.exports = {
    name: "messageUpdate",
    async execute(oldMessage, newMessage, client){
        if (oldMessage.author.bot) return
        if (!oldMessage.content) return
        const regex = /<@!?(1|\d{17,19})>/
        if (oldMessage.content.match(regex) || oldMessage.content.match('@everyone')) {
           if(!newMessage.content.match(regex) || !newMessage.content.match('@everyone')){
            console.log(`${oldMessage.author.username} updated ghost pinged message in ${oldMessage.channel} in ${oldMessage.guild}`)
            const embed = new Discord.MessageEmbed()
                .setColor('RED')
                .setAuthor(oldMessage.author.username, oldMessage.author.displayAvatarURL)
                .setDescription(`Well well well, <@${oldMessage.author.id}> decided to edit their ghost pinged message...`)
                .addField('Their OldMessage was', `${oldMessage.content}`)
              oldMessage.channel.send({
				embeds: [embed] 
			})	
           }else{
                return
           }
        }
  }
} 
