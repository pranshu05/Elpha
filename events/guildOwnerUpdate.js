const Discord = require('discord.js')
const Modlog = require("../models/Modlog")
module.exports = {
	name: "guildOwnerUpdate",
	async execute(oldGuild, newGuild) {
         const modlog = await Modlog.findOne({guild_id: newGuild.id})
          if (!modlog) {
                return
            }else{
                const embed = new Discord.MessageEmbed()
                .setColor("#00FFFF")
                .setTitle(oldGuild.name+" has a new owner!")
                .addField('Owner' , `<@${newGuild.ownerId}>`)
                const abc = newGuild.channels.cache.get(modlog.modlog_channel_id)
                abc.send({
                    embeds: [embed]
                })	
            }
    }
}