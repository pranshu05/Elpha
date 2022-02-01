const Discord = require('discord.js')
const Modlog = require("../models/Modlog")
module.exports = {
	name: "guildMemberNicknameUpdate",
	async execute(member, oldNickname, newNickname) {
         const modlog = await Modlog.findOne({guild_id: member.guild.id})
          if (!modlog) {
                return
            }else{
                const embed = new Discord.MessageEmbed()
                .setColor("#00FFFF")
                .setTitle(member.user.tag+"'s nickname is now "+newNickname)
                .addField("Old nickname" ,  `${oldNickname}`)
                .addField("New nickname" ,  `${newNickname}`)
                const abc = member.guild.channels.cache.get(modlog.modlog_channel_id)
                abc.send({
                    embeds: [embed]
                })	
            }
    }
}