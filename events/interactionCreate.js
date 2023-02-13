const Discord = require('discord.js')
module.exports = {
    name: "interactionCreate",
    async execute(interaction){
        const err_embed = new Discord.MessageEmbed()
        .setColor('FF0000')
        .setAuthor(`Error Occured! `, interaction.client.user.displayAvatarURL())
        .setTitle('An error occured while executing the command')
        if(!interaction.isCommand()) return
            const command = interaction.client.commands.get(interaction.commandName)
        if(!command) return
            try{
                await command.execute(interaction)
            } catch(err){
                if (err) console.error(err)
                await interaction.reply({
                    embeds: [err_embed],
                    ephemeral: true
                })
            }
            if(interaction.isSelectMenu()){
                let choice = interaction.values[0] 
                const member = interaction.member
                if(interaction.customID !== 'roles') return
                if(choice == '1'){
                    if (member.roles.cache.has('959447841355468801')) {
                        interaction.reply({content: "The role was successfully removed from you" , ephemeral: true})
                        member.roles.remove('959447841355468801')
                        .catch(console.error)
                    }
                    else{
                        member.roles.add('959447841355468801')
                        await interaction.reply({ content: "The role was successfully added to you", ephemeral: true })
                        .catch(console.error)
                    }
                }
                if(choice == '2'){
                    if (member.roles.cache.has('959447841355468801')) {
                        interaction.reply({content: "The role was successfully removed from you" , ephemeral: true})
                        member.roles.remove('959447841355468801')
                        .catch(console.error)
                    }
                    else{
                        member.roles.add('959447841355468801')
                        await interaction.reply({ content: "The role was successfully added to you", ephemeral: true })
                        .catch(console.error)
                    }
                }
                if(choice == '3'){
                    if (member.roles.cache.has('959447842282414130')) {
                        interaction.reply({content: "The role was successfully removed from you" , ephemeral: true})
                        member.roles.remove('959447842282414130')
                        .catch(console.error)
                    }
                    else{
                        member.roles.add('959447842282414130')
                        await interaction.reply({ content: "The role was successfully added to you", ephemeral: true })
                        .catch(console.error)
                    }
                }
                if(choice == '4'){
                    if (member.roles.cache.has('959447842844467210')) {
                        interaction.reply({content: "The role was successfully removed from you" , ephemeral: true})
                        member.roles.remove('959447842844467210')
                        .catch(console.error)
                    }
                    else{
                        member.roles.add('959447842844467210')
                        await interaction.reply({ content: "The role was successfully added to you", ephemeral: true })
                        .catch(console.error)
                    }
                }
                if(choice == '5'){
                    if (member.roles.cache.has('959447834254532658')) {
                        interaction.reply({content: "The role was successfully removed from you" , ephemeral: true})
                        member.roles.remove('959447834254532658')
                        .catch(console.error)
                    }
                    else{
                        member.roles.add('959447834254532658')
                        await interaction.reply({ content: "The role was successfully added to you", ephemeral: true })
                        .catch(console.error)
                    }
                }
                if(choice == '6'){
                    if (member.roles.cache.has('959447834669752362')) {
                        interaction.reply({content: "The role was successfully removed from you" , ephemeral: true})
                        member.roles.remove('959447834669752362')
                        .catch(console.error)
                    }
                    else{
                        member.roles.add('959447834669752362')
                        await interaction.reply({ content: "The role was successfully added to you", ephemeral: true })
                        .catch(console.error)
                    }
                }
                if(choice == '7'){
                    if (member.roles.cache.has('959447835181461554')) {
                        interaction.reply({content: "The role was successfully removed from you" , ephemeral: true})
                        member.roles.remove('959447835181461554')
                        .catch(console.error)
                    }
                    else{
                        member.roles.add('959447835181461554')
                        await interaction.reply({ content: "The role was successfully added to you", ephemeral: true })
                        .catch(console.error)
                    }
                }
                if(choice == '8'){
                    if (member.roles.cache.has('959447835663802368')) {
                        interaction.reply({content: "The role was successfully removed from you" , ephemeral: true})
                        member.roles.remove('959447835663802368')
                        .catch(console.error)
                    }
                    else{
                        member.roles.add('959447835663802368')
                        await interaction.reply({ content: "The role was successfully added to you", ephemeral: true })
                        .catch(console.error)
                    }
                }
                if(choice == '9'){
                    if (member.roles.cache.has('959447846166343740')) {
                        interaction.reply({content: "The role was successfully removed from you" , ephemeral: true})
                        member.roles.remove('959447846166343740')
                        .catch(console.error)
                    }
                    else{
                        member.roles.add('959447846166343740')
                        await interaction.reply({ content: "The role was successfully added to you", ephemeral: true })
                        .catch(console.error)
                    }
                }
                if(choice == '10'){
                    if (member.roles.cache.has('959447845700767755')) {
                        interaction.reply({content: "The role was successfully removed from you" , ephemeral: true})
                        member.roles.remove('959447845700767755')
                        .catch(console.error)
                    }
                    else{
                        member.roles.add('959447845700767755')
                        await interaction.reply({ content: "The role was successfully added to you", ephemeral: true })
                        .catch(console.error)
                    }
                }
                if(choice == '11'){
                    if (member.roles.cache.has('959447846745153586')) {
                        interaction.reply({content: "The role was successfully removed from you" , ephemeral: true})
                        member.roles.remove('959447846745153586')
                        .catch(console.error)
                    }
                    else{
                        member.roles.add('959447846745153586')
                        await interaction.reply({ content: "The role was successfully added to you", ephemeral: true })
                        .catch(console.error)
                    }
                }
            }
    }
}