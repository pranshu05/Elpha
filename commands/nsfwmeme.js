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
        const [list1] = JSON.parse(response.body);
        const [post1] = list.data.children;
        const permalink1 = post.data.permalink;
        const memeImage1 = post.data.url ;
        const memevideo1 = post.data.url + '/DASH_240.mp4' ;
        const memeTitle1 = post.data.title;
        const memeUpvotes1 = post.data.ups;
        const memeNumComments1 = post.data.num_comments;
        const extension1 = path.extname(memeImage1);
        if (extension1 === ".jpg" || extension1 === ".png" || extension1 === ".jpeg") {
          const embed1 = new Discord.MessageEmbed();
          embed1.setTitle(memeTitle1);
          embed1.setColor("#00FFFF");
          embed1.setImage(memeImage1);
          embed1.setFooter(`👍 ${memeUpvotes1} 💬 ${memeNumComments1}`);
          interaction.reply({ embeds: [embed1] });
        } else {
          interaction.reply(
            `${memeTitle1} \n ${memevideo1}`
          );
        }
      })
      .catch(console.error);
  
  }
}
}
