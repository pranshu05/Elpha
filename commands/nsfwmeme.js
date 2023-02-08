const { SlashCommandBuilder } = require("@discordjs/builders");
const Discord = require("discord.js");
const got = require("got");
const fs = require("fs");
const path = require("path");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("nsfwmeme")
    .setDescription("WARNING! nsfw(meme) content 18+ only"),
  async execute(interaction) {
    if (!interaction.channel.nsfw) {
    got("https://www.reddit.com/r/Hornyjail/random.json?include_over_18=on")
      .then((response) => {
        const [list] = JSON.parse(response.body);
        const [post] = list.data.children;
        const permalink = post.data.permalink;
        const memeImage = post.data.url ;
        const memevideo = post.data.url + '/DASH_240.mp4' ;
        const memeTitle = post.data.title;
        const memeUpvotes = post.data.ups;
        const memeNumComments = post.data.num_comments;
        const extension = path.extname(memeImage);
        if (extension === ".jpg" || extension === ".png" || extension === ".jpeg") {
          const embed = new Discord.MessageEmbed();
          embed.setTitle(memeTitle);
          embed.setColor("#00FFFF");
          embed.setImage(memeImage);
          embed.setFooter(`👍 ${memeUpvotes} 💬 ${memeNumComments}`);
          interaction.reply({ embeds: [embed] });
        } else {
          interaction.reply(
            `${memeTitle} \n ${memevideo}`
          );
        }
      })
      .catch(console.error);
  } else {
    got("https://www.reddit.com/r/NSFWMemes/random.json?include_over_18=on")
      .then((response) => {
        const [list] = JSON.parse(response.body);
        const [post] = list.data.children;
        const permalink = post.data.permalink;
        const memeImage = post.data.url ;
        const memevideo = post.data.url + '/DASH_240.mp4' ;
        const memeTitle = post.data.title;
        const memeUpvotes = post.data.ups;
        const memeNumComments = post.data.num_comments;
        const extension = path.extname(memeImage);
        if (extension === ".jpg" || extension === ".png" || extension === ".jpeg") {
          const embed = new Discord.MessageEmbed();
          embed.setTitle(memeTitle);
          embed.setColor("#00FFFF");
          embed.setImage(memeImage);
          embed.setFooter(`👍 ${memeUpvotes} 💬 ${memeNumComments}`);
          interaction.reply({ embeds: [embed] });
        } else {
          interaction.reply(
            `${memeTitle} \n ${memevideo}`
          );
        }
      })
      .catch(console.error);
  
  }
};
}
