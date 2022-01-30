const Discord = require('discord.js')
const Modlog = require("../models/Modlog")
module.exports = {
	name: "guildBoostLevelDown",
	async execute(guild, newLevel) {
         const modlog = await Modlog.findOne({guild_id: guild.id})
          if (!modlog) {
                return
            }else{
                const embed = new Discord.MessageEmbed()
                .setColor("#00FFFF")
                .setTitle(guild.name+" returned to the boost level: "+newLevel)
                const abc = guild.channels.cache.get(modlog.modlog_channel_id)
                abc.send({
                    embeds: [embed]
                })	
            }
    }
}