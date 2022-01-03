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
    }
}