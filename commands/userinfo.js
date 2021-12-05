const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, Discord }  = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("userinfo")
    .setDescription("user's info!"),
    
    async execute(cilent, interaction, member){
        
        
console.log(member.user);
        
        const infoEmbed = new Discord.MessageEmbed()
            .setColor("BLUE")
            .setTitle(`${member.user.username}'s Information`)
            .setDescription(`Info from ${message.guild.name}`)
            .setThumbnail(member.user.avatarURL({dynamic: true}))
            .setFooter('requested')
            .setTimestamp()
            .addFields(
                { 
                    name: "User Info",
                    value: "```Username:"+member.user.username+"\nDiscriminator: #"+member.user.discriminator+"\nTag: "member.user.tag+"\nServer Nickname: "+member.displayName+"\nIs Bot: "member.user.bot+"\nID: "+user.id+" ```",
                    inline: true
                },
                {
                    name: `Status`,
                    value: "```"+member.user.presence.status+"\n"+activities+"```",
                    inline: false
                },
                {
                    name: `Member Info`,
                    value: "```Joined Server: "+new Date(member.user.joinedAt).toLocaleDateString()+"\nJoined Discord: "+new Date(member.user.createdTimestamp).toLocaleDateString()+"```",
                    inline: true
                },
                {
                  name: `Roles`,
                  value: ""+member.roles.cache.map(r => r).join(' | ')+"",
                  inline: true
                },
              
            
            );

member.guild.channels.send({
				embeds: [infoEmbed] 
  

        })
    }
}
