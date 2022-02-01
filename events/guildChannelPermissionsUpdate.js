const Discord = require('discord.js')
const Modlog = require("../models/Modlog")
module.exports = {
	name: "guildChannelPermissionsUpdate",
	async execute(channel, oldPermissions, newPermissions) {
         const modlog = await Modlog.findOne({guild_id: channel.guild.id})
          if (!modlog) {
                return
            }else{
                const embed = new Discord.MessageEmbed()
                .setColor("#00FFFF")
                .setTitle(channel.name+"'s permissions updated!")
                .addField(`Old permission`,  `${oldPermissions}`)
                .addField(`New permission`,  `${newPermissions}`)
                const abc = channel.guild.channels.cache.get(modlog.modlog_channel_id)
                abc.send({
                    embeds: [embed]
                })	
            }
    }
}