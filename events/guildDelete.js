module.exports = {
  name: 'guildDelete',
  async execute(guild, client) {
    if (!guild.available) return;

    console.log(`Server left: ${guild.name}`);
  },
};
