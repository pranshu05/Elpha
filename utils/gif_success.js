const Discord = require('discord.js')
const name = require("../commands/addgif")
const gif_success = new Discord.MessageEmbed()
        .setColor('#00FF00')
	    .setTitle(':white_check_mark: GIF added')
        .setDescription(`GIF named `+ name +` added!\n` + `type elp gif `+name +` to send gif\n` + `You can undo this by **/removegif** command`)
        
module.exports.gif_success = gif_success