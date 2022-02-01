const Discord = require('discord.js')
const Modlog = require("../models/Modlog")
module.exports = {
	name: "guildChannelTopicUpdate",
	async execute(channel, oldTopic, newTopic) {
         const modlog = await Modlog.findOne({guild_id: channel.guild.id})
          if (!modlog) {
                return
            }else{
                const embed = new Discord.MessageEmbed()
                .setColor("#00FFFF")
                .setTitle(channel.name+"'s topic updated!")
                .addField(`Old topic`,  `${oldTopic}`)
                .addField(`New topic`,  `${newTopic}`)
                const abc = channel.guild.channels.cache.get(modlog.modlog_channel_id)
                abc.send({
                    embeds: [embed]
                })	
            }
    }
}