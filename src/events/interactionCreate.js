const { createInteractionLogEmbed } = require("../utils/intlogemb")

module.exports = {
  name: "interactionCreate",
  async execute(interaction) {
    if (!interaction.isCommand() || !interaction.guild) {
      return interaction.reply("You can use slash commands only in a server!")
    }

    const command = interaction.client.commands.get(interaction.commandName)

    if (!command) return

    try {
      await command.execute(interaction)

      const channelId = "1151789513883013130"
      const channel = interaction.guild.channels.cache.get(channelId)

      if (channel) {
        const interactionLogEmbed = createInteractionLogEmbed(interaction)
        channel.send({ embeds: [interactionLogEmbed] })
      }
    } catch (err) {
      console.error(err)
      await interaction.reply({
        content: "Some error occurred!",
        ephemeral: true,
      })
    }
  },
}
