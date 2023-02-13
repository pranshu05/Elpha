require("dotenv").config();
const { SlashCommandBuilder } = require("@discordjs/builders");
const Discord = require("discord.js");
const got = require("got");
const fs = require("fs");
const fetch = require("node-fetch");
const path = require("path");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("nsfw")
    .setDescription("WARNING! nsfw content 18+ only"),
  async execute(interaction) {
    if (interaction.channel.nsfw) {
      got("https://www.reddit.com/r/nsfw/random.json?include_over_18=on")
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
          } else if (
            extension === ".gif" ||
            extension === ".mp4" ||
            extension === ".mkv" ||
            extension === ".gifv" ||
          ) {
            interaction.reply(`${memeTitle} \n ${memeImage}`);
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
      let sentances = [
        "What were you expecting?",
        "You horny jerk!",
        "I will send you to Jesus",
        "Go to horny jail",
        "Jesus is knocking on your door",
        "I am sending FBI",
      ];
      let sentance_index = Math.floor(
        Math.random() * Math.floor(sentances.length)
      );
      let sentance = sentances[sentance_index];
      let url = `https://tenor.googleapis.com/v2/search?q=${keyword}&key=${process.env.tenor}&client_key=my_test_app&limit=50`;
      let response = await fetch(url);
      let json = await response.json();
      let url_index = Math.floor(Math.random() * json.results.length);
      let random_url = json.results[url_index].url;
      interaction.reply(`${random_url}`);
      setTimeout(() => {
        if (
          interaction.guild.me
            .permissionsIn(interaction.channel)
            .has(Discord.Permissions.FLAGS.SEND_MESSAGES)
        ) {
          interaction.channel.send(
            `lol ${interaction.user}, ${sentance} (Channel Not age-restricted)`
          );
        } else {
          return;
        }
      }, 4000);
    }
  },
};
