<div align="center">
<br />
<h1>Elpha! The open-source discord bot</h1>
<br />

![Elpha](https://user-images.githubusercontent.com/70943732/213678287-d3c9a9c9-4fa5-44e6-99d7-0976d91cdad6.png)

[![Discord](https://img.shields.io/discord/754381521854398595?color=white&label=DISCORD&logo=discord)](https://discord.gg/CVyx9qyYPF)
[![invite](https://img.shields.io/badge/INVITE-ELPHA-yellow)](https://discord.com/oauth2/authorize?client_id=916613852362330133&permissions=8&scope=bot%20applications.commands)
![Version](https://img.shields.io/badge/version-1.2.0-green.svg?cacheSeconds=2592000)
![botlib](https://img.shields.io/badge/powered_by-discord.js-blue)
![GitHub repo size](https://img.shields.io/github/repo-size/pranshu05/elpha)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)
![PRs](https://img.shields.io/github/issues-pr/pranshu05/elpha)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg)
![Licence](https://img.shields.io/badge/license-MIT-orange)

</div>

# 🤖 What is Elpha?

### Elpha is an open source discord bot which developed from discord.js and based on slash commands. Contribute to this open-source repo to make the bot more powerful.

# Getting Started with SLoP3.0

## Before You Begin...

Creating a bot using [discord.js](https://discord.js.org/) requires a solid understanding of JavaScript. While it's possible to build a bot with minimal programming knowledge, not having a good grasp of JavaScript can lead to frustration when facing basic issues and problems. It's essential to learn the language first to avoid unnecessary obstacles.

For this project, we will be using [discord.js](https://discord.js.org/) as our primary library, and we will be referring to its comprehensive [documentation](https://discordjs.guide/) extensively.

To test and communicate with the community, please join the [Discord Server](https://discord.gg/N9DhCWk2yR). Once you've forked and cloned this repository, it's crucial to go through the following sections:

-   **Installation and Preparations**: Get your development environment set up by following the steps outlined in [Installation and Preparations](https://discordjs.guide/preparations).

-   **Creating Your Bot**: Learn how to create your Discord bot by following the guidelines in [Creating your bot](https://discordjs.guide/creating-your-bot). After creating your bot please send bot's **client id** in the [Discord Server](https://discord.gg/N9DhCWk2yR).

-   **Slash Commands**: Understand how to implement Slash Commands, a powerful feature in Discord bots, by referring to [Slash Commands](https://discordjs.guide/slash-commands).

Please note that the [old branch](https://github.com/pranshu05/Elpha/tree/old) of this repository contains files of the bot created in discord.js v13. In SLoP3.0, we are migrating this bot to discord.js v14, so it's crucial to review the changes between the two versions. You can find a comprehensive list of these changes in [A list of the changes from discord.js v13 to v14](https://discordjs.guide/additional-info/changes-in-v14.html).

I am excited to have you on board for this project, and I believe this experience will be a valuable learning opportunity. If you have any questions or need assistance, feel free to reach out to me through our Discord Server.

## How to Install Packages?

To get started, ensure that you have Node.js and npm (Node Package Manager) installed on your system. Then, follow these steps:

1. Open your terminal or command prompt.

2. Navigate to the project directory where the bot's code is located.

3. Run the following command to install the necessary packages:

```sh
npm install
```

## How to Run the Bot?

To run the bot, use the following command:

```sh
npm start
```

## Development Setup

If you are developing the bot and want automatic code reloading during changes, you can use nodemon. Here's how to set it up:

Install `nodemon` globally by running:

```sh
npm install -g nodemon
```

Add a `dev` script to your package.json file, like this:

```json
 "scripts": {
    "start": "node src/bot.js",
    "dev": "nodemon src/bot.js"
  }
```

Now, you can run the bot in development mode using the following command:

```sh
npm run dev
```

This will automatically restart the bot whenever you make changes to the source code, making your development workflow more efficient.

## .env File

The `.env` file contains sensitive information such as tokens and API keys. It's crucial to keep this file secure and never share it with anyone. Here's how your .env file should be structured:

```plaintext
MONGO_URL=your_mongo_url_here
token=your_bot_token_here
tenor=your_tenor_api_key_here
```

Make sure to replace `your_mongo_url_here`, `your_bot_token_here`, and `your_tenor_api_key_here` with your actual credentials and keys.

**Adding .env to .gitignore:**

To ensure that your .env file is not accidentally committed to version control (e.g., Git), you should add it to your project's `.gitignore` file. If you don't have a `.gitignore` file yet, create one in the root of your project directory.

Here's how you can add `.env` to your `.gitignore` file:

1. Open or create your `.gitignore` file.

2. Add the following line to it:

```plaintext
.env
```

3. Save the `.gitignore` file.

By adding `.env` to your `.gitignore`, you ensure that this sensitive file is not tracked by Git and remains private. Protecting your credentials and API keys is essential for the security of your application.

---

### Happy coding and welcome to the world of Discord bot development! 🤖🚀

# 🤝 Contributors

<a href="https://github.com/pranshu05/elpha/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=pranshu05/Elpha" />
</a>

# 📈 Analytics

> [![Status](https://repobeats.axiom.co/api/embed/06ce5b60cff43fcfea8658562813c176fb527bce.svg 'Analytics image')](https://github.com/pranshu05/elpha/pulse)

# 📝 License

Copyright © 2023 [Pranshu Patel](https://github.com/pranshu05)

This project is [MIT](https://opensource.org/licenses/MIT) licensed.

---
