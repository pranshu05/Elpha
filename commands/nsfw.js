const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require('discord.js')
const got = require('got')
module.exports = {
  data: new SlashCommandBuilder()
    .setName("nsfw")
    .setDescription("WARNING! nsfw content 18+ only"),
  async execute(interaction) {
    got("https://www.reddit.com/r/Hornyjail/random.json?obey_over18=true")
      .then((response) => {
        const [list] = JSON.parse(response.body);
        const [post] = list.data.children;
        const media = post.data.media;
        if (media && media.type === "video") {
          return interaction.reply(post.data.media.reddit_video.fallback_url);
        } else if (media && media.type === "image") {
          const memeImage = post.data.url;
          const memeTitle = post.data.title;
          const embed = new Discord.MessageEmbed()
            .setTitle(memeTitle)
            .setColor("#00FFFF")
            .setImage(memeImage);
          interaction.reply({ embeds: [embed] });
        }
      })
      .catch(console.error);
  },
};
