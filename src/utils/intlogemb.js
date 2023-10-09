module.exports = {
  createInteractionLogEmbed: (interaction) => {
    const intlogemb = {
      title: "Interaction Log",
      thumbnail: {
        url: "https://i.imgur.com/d4yRAUD.png",
      },
      fields: [
        {
          name: "Command:",
          value: `${interaction.commandName} (${interaction.id})`
        },
        {
          name: "User:",
          value: `${interaction.user} (${interaction.user.id})`,
        },
        {
          name: "Server:",
          value: `${interaction.guild.name} (${interaction.guild.id})`,
          inline: false,
        },
        {
          name: "Channel:",
          value: `${interaction.channel.name} (${interaction.channel.id})`,
          inline: false,
        },
      ],
      timestamp: new Date().toISOString(),
    }
    return intlogemb
  },
}
