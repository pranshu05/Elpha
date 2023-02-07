const { SlashCommandBuilder } = require("@discordjs/builders");
const Discord = require("discord.js");
const got = require("got");
const fs = require("fs");
const path = require("path");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("nsfw")
    .setDescription("WARNING! nsfw content 18+ only"),
  async execute(interaction) {
    got("https://www.reddit.com/r/Hornyjail/random.json?obey_over18=true")
      .then((response) => {
        const [list] = JSON.parse(response.body);
        const [post] = list.data.children;
        const permalink = post.data.permalink;
        const memeUrl = `https://reddit.com${permalink}`;
        const memeImage = post.data.url;
        const memevideo =
          post.data.secure_media.reddit_video
            .fallback_url;
        const memeTitle = post.data.title;
        const memeUpvotes = post.data.ups;
        const memeNumComments = post.data.num_comments;
        const extension = path.extname(memeImage);
        if (
          extension === ".jpg" || extension === ".png" || extension === ".jpeg") {
          const embed = new Discord.MessageEmbed();
          embed.setTitle(`${memeTitle}`);
          embed.setColor("#00FFFF");
          embed.setImage(memeImage);
          embed.setFooter(`👍 ${memeUpvotes} 💬 ${memeNumComments}`);
          interaction.reply({ embeds: [embed] });
        } else {
          interaction.reply(
            `${memeTitle} \n ${memevideo}\n 👍 ${memeUpvotes} 💬 ${memeNumComments}`
          );
        }
      })
      .catch(console.error);
  },
};
