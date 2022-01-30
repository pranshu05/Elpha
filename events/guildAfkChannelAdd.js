const Discord = require('discord.js')
const Modlog = require("../models/Modlog")
module.exports = {
	name: "guildAfkChannelAdd",
	async execute(guild, afkChannel) {
         const modlog = await Modlog.findOne({guild_id: guild.id})
          if (!modlog) {
                return
            }else{
                const embed = new Discord.MessageEmbed()
                .setColor("#00FFFF")
                .setTitle(guild.name+" has an AFK channel now!")
                .addField('Channel' , afkChannel)
                const abc = guild.channels.cache.get(modlog.modlog_channel_id)
                abc.send({
                    embeds: [embed]
                })	
            }
    }
}