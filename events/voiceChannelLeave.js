const Discord = require('discord.js')
const Modlog = require("../models/Modlog")
module.exports = {
	name: "voiceChannelLeave",
	async execute(member, channel) {
         const modlog = await Modlog.findOne({guild_id: member.guild.id})
          if (!modlog) {
                return
            }else{
                const embed = new Discord.MessageEmbed()
                .setColor("#00FFFF")
                .setTitle(member.user.tag+" left VC")
                .addField(`Channel`, `${channel.name}`)
                const abc = member.guild.channels.cache.get(modlog.modlog_channel_id)
                abc.send({
                    embeds: [embed]
                })	
            }
    }
}