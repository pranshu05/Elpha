const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');
const got = require('got');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('eat-or-pass')
    .setDescription('send eat or pass poll'),
  async execute(interaction) {
    if (
      !interaction.guild.me
        .permissionsIn(interaction.channel)
        .has(Discord.Permissions.FLAGS.SEND_MESSAGES)
    ) {
      interaction.reply(
        'I dont have permission to send message in this channel'
      );
      return;
    }
    const embed = new Discord.MessageEmbed();
    got('https://www.reddit.com/r/food/random/.json')
      .then((response) => {
        const [list] = JSON.parse(response.body);
        const [post] = list.data.children;
        const permalink = post.data.permalink;
        const foodUrl = `https://reddit.com${permalink}`;
        const foodImage = post.data.url;
        const foodTitle = post.data.title;
        const foodUpvotes = post.data.ups;
        const foodNumComments = post.data.num_comments;
        embed.setTitle(`Eat or Pass`);
        embed.setColor('#00FFFF');
        embed.setImage(foodImage);
        interaction.reply({ content: 'Just a sec!', ephemeral: true }).then(
          interaction.channel.send({ embeds: [embed] }).then((sentEmbed) => {
            sentEmbed.react('👍');
            sentEmbed.react('👎');
          })
        );
      })
      .catch(console.error);
  },
};
