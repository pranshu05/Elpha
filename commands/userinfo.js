const { SlashCommandBuilder } = require("@discordjs/builders");
const  Discord  = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("userinfo")
    .setDescription("user's info!"),
    
    async execute(interaction){

        const infoEmbed = new Discord.MessageEmbed()
            .setColor("BLUE")
            .setTitle(`${member.user.username}'s Information`)
            .setDescription(`Info from ${message.guild.name}`)
            .setThumbnail(user.avatarURL({dynamic: true}))
            .setFooter('requested')
            .setTimestamp()
            .addFields(
                { 
                    name: "User Info",
                    value: "```Username:"+user.username+"\nDiscriminator: #"+user.discriminator+"\nTag: "+user.tag+"\nServer Nickname: "+member.displayName+"\nIs Bot: "+user.bot+"\nID: "+user.id+" ```",
                    inline: true
                },
                {
                    name: `Status`,
                    value: "```"+user.presence.status+"\n"+activities+"```",
                    inline: false
                },
                {
                    name: `Member Info`,
                    value: "```Joined Server: "+new Date(user.joinedAt).toLocaleDateString()+"\nJoined Discord: "+new Date(user.createdTimestamp).toLocaleDateString()+"```",
                    inline: true
                },
                {
                  name: `Roles`,
                  value: ""+member.roles.cache.map(r => r).join(' | ')+"",
                  inline: true
                },
              
            
            );


        interaction.reply({
            embeds: [infoEmbed] 
        })
    }
}
