const Discord = require('discord.js')
module.exports = {
    name: "messageReactionAdd",
    async execute(reaction, user){
        const Programming = reaction.message.guild.roles.find(role => role.name === `Programming`)
        const Design = reaction.message.guild.roles.find(role => role.name === `Design`)
        const Entrepreneurship = reaction.message.guild.roles.find(role => role.name === `Entrepreneurship`)
        const web3 = reaction.message.guild.roles.find(role => role.name === `web3`)
        const member = reaction.message.guild.members.find(member => member.id === user.id)
        const prog_emoji = '👨🏻‍💻'
        const des_emoji = '🧑🏻‍🎨'
        const ent_emoji = '🤵🏻'
        const web3_emoji = '🪙'
        if(!reaction.message.guild.id === `754381521854398595`){
            return
        }else{
            if (reaction.message.partial) await reaction.message.fetch()
            if (reaction.partial) await reaction.fetch()
            if (user.bot) return
            if (!reaction.message.guild) return
            if (reaction.channel.id === '852791356664709160'){
                if (reaction.emoji.name === prog_emoji) {
                    if(!member.roles.has(Programming)){
                        await member.roles.add(Programming)
                        user.reply({content: 'Role was aadded succesfully!', ephemeral: true })
                    }else{
                        user.reply({content: 'You already have that role!', ephemeral: true})
                    }
                }
            }else{
                return
            }
        }
  }
} 
