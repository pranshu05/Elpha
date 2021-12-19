module.exports = {
    name: "interactionCreate",
    async execute(interaction){

        if(!interaction.isCommand()) return

    const command = interaction.client.commands.get(interaction.commandName)

    if(!command) return
    try{
        await command.execute(interaction)
    } catch(err){
        if (err) console.error(err)

        await interaction.reply({
            content: "An err occured while executing the command",
            ephemeral: true
        })
    }
    if(interaction.isSelectMenu()){
      
        let choice = interaction.values[0] 
        const member = interaction.member
         if(choice == 'Youtuber'){
            if (member.roles.cache.some(role => role.id == '852790051644375061')) {
                interaction.reply({content: "The role was successfully removed from you"})
                member.roles.remove('852790051644375061')
            }
            else{
            member.roles.add('852790051644375061')
                await interaction.reply({ content: "The role was successfully added to you"})}
              }
    
    else if(choice == 'Memer'){
        if (member.roles.cache.some(role => role.id == '852789735613005864')) {
            interaction.reply({content: "The role was successfully removed from you"})
            member.roles.remove('852789735613005864')
        }
        else{
        member.roles.add('852789735613005864')
            await interaction.reply({ content: "The role was successfully added to you"})}
          }
    
    
          else if(choice == 'Programmer'){
            if (member.roles.cache.some(role => role.id == '852789927402143754')) {
                interaction.reply({content: "The role was successfully removed from you"})
                member.roles.remove('852789927402143754')
            }
            else{
            member.roles.add('852789927402143754')
                await interaction.reply({ content: "The role was successfully added to you"})}
              }
    
    
    
              else if(choice == 'Game Dev'){
                if (member.roles.cache.some(role => role.id == '852789996159369287')) {
                    interaction.reply({content: "The role was successfully removed from you!"})
                    member.roles.remove('852789996159369287')
                }
                else{
                member.roles.add('852789996159369287')
                    await interaction.reply({ content: "The role was successfully added to you"})}
                  }
        }
    }
}