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
    if (interaction.channel.nsfw) {
      got("https://www.reddit.com/r/NSFWMemes/random.json?include_over_18=on")
        .then((response) => {
          const body = JSON.parse(response.body);
          const list = body.data;
          const post = list.children[0];
          const memeUrl = `https://reddit.com${permalink}`;
          const memeImage = post.data.url;
          const memeTitle = post.data.title;
          const memeUpvotes = post.data.ups;
          const memeNumComments = post.data.num_comments;
          let embed = new Discord.MessageEmbed();
          embed.setTitle(`${memeTitle}`);
          embed.setColor("#00FFFF");
          embed.setImage(memeImage);
          embed.setFooter(`👍 ${memeUpvotes} 💬 ${memeNumComments}`);
          interaction.reply({ embeds: [embed] });
        })
        .catch(console.error);
    } else {
      return interaction.reply(
        "You can use this command only in NSFW channel!"
      );
    }
  },
};
