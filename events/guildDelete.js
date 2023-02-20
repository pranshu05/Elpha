module.exports = {
  name: 'guildDelete',
  async execute(guild, client) {
    if (guild.available) {
      console.log(`Server left: ${guild.name}`);
    }
  },
};
