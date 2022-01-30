const Discord = require('discord.js')
const Modlog = require("../models/Modlog")
module.exports = {
	name: "messagePinned",
	async execute(message) {
         const modlog = await Modlog.findOne({guild_id: message.guild.id})
          if (!modlog) {
                return
            }else{
                const embed = new Discord.MessageEmbed()
                .setColor("#00FFFF")
                .setTitle("Message was pinned")
                .addField(`Message:`, `${message}`)
                const abc = message.guild.channels.cache.get(modlog.modlog_channel_id)
                abc.send({
                    embeds: [embed]
                })	
            }
    }
}