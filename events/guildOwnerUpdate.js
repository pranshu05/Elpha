const Discord = require('discord.js')
const Modlog = require("../models/Modlog")
module.exports = {
	name: "guildOwnerUpdate",
	async execute(oldGuild, newGuild) {
         const modlog = await Modlog.findOne({guild_id: guild.id})
          if (!modlog) {
                return
            }else{
                const embed = new Discord.MessageEmbed()
                .setColor("#00FFFF")
                .setTitle(oldGuild.name+" has a new owner!")
                .addField('Owner' , newGuild.owner.id)
                const abc = guild.channels.cache.get(modlog.modlog_channel_id)
                abc.send({
                    embeds: [embed]
                })	
            }
    }
}