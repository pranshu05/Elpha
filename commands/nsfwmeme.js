require("dotenv").config()
const { SlashCommandBuilder } = require("@discordjs/builders");
const Discord = require("discord.js");
const got = require("got");
const fs = require("fs");
const fetch = require("node-fetch")
const path = require("path");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("nsfwmeme")
    .setDescription("WARNING! nsfw(meme) content 18+ only"),
  async execute(interaction) {
    if (interaction.channel.nsfw) {
      got("https://www.reddit.com/r/NSFWmeme/random.json?include_over_18=on")
        .then((response) => {
          const [list] = JSON.parse(response.body);
          const [post] = list.data.children;
          const permalink = post.data.permalink;
          const memeImage = post.data.url;
          const memevideo = post.data.url + "/DASH_240.mp4";
          const memeTitle = post.data.title;
          const memeUpvotes = post.data.ups;
          const memeNumComments = post.data.num_comments;
          const extension = path.extname(memeImage);
          if (
            extension === ".jpg" ||
            extension === ".png" ||
            extension === ".jpeg"
          ) {
            const embed = new Discord.MessageEmbed();
            embed.setTitle(memeTitle);
            embed.setColor("#00FFFF");
            embed.setImage(memeImage);
            embed.setFooter(`👍 ${memeUpvotes} 💬 ${memeNumComments}`);
            interaction.reply({ embeds: [embed] });
          } else {
            interaction.reply(`${memeTitle} \n ${memevideo}`);
          }
        })
        .catch(console.error);
    } else {
      let keywords = ["horny jail", "no horny", "anti horny"];
      let keyword_index = Math.floor(
        Math.random() * Math.floor(keywords.length)
      );
      let keyword = keywords[keyword_index];
      let url = `https://tenor.googleapis.com/v2/search?q=${keyword}&key=${process.env.tenor}&client_key=my_test_app&limit=50`;
      let response = await fetch(url);
      let json = await response.json();
      let url_index = Math.floor(Math.random() * json.results.length);
      let random_url = json.results[url_index].url;
      interaction.reply(`${random_url}`);
    }
  },
};
