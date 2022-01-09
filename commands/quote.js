const { SlashCommandBuilder } = require('@discordjs/builders')
const Discord = require('discord.js')
module.exports = {
    data: new SlashCommandBuilder()
    .setName('quote')
    .setDescription('sends rendom quote'),
    async execute(interaction) {
        let quote = [
            'Spread love everywhere you go. Let no one ever come to you without leaving happier. -Mother Teresa',
            'When you reach the end of your rope, tie a knot in it and hang on. -Franklin D. Roosevelt ',
            'Always remember that you are absolutely unique. Just like everyone else. -Margaret Mead ',
            'Dont judge each day by the harvest you reap but by the seeds that you plant. -Robert Louis Stevenson',
            'The future belongs to those who believe in the beauty of their dreams. -Eleanor Roosevelt ',
            'Tell me and I forget. Teach me and I remember. Involve me and I learn. -Benjamin Franklin ',
            'The best and most beautiful things in the world cannot be seen or even touched — they must be felt with the heart. -Helen Keller',
            'It is during our darkest moments that we must focus to see the light. -Aristotle',
            'Whoever is happy will make others happy too. -Anne Frank ',
            'Do not go where the path may lead, go instead where there is no path and leave a trail. -Ralph Waldo Emerson            ',
            'You will face many defeats in life, but never let yourself be defeated. -Maya Angelou            ',
            'The greatest glory in living lies not in never falling, but in rising every time we fall. -Nelson Mandela            ',
            'In the end, it is not the years in your life that count. It is the life in your years. -Abraham Lincoln            ',
            'Never let the fear of striking out keep you from playing the game. -Babe Ruth            ',
            'Life is either a daring adventure or nothing at all. -Helen Keller            ',
            'You have brains in your head. You have feet in your shoes. You can steer yourself any direction you choose. -Dr. Seuss            ',
            'Keep smiling, because life is a beautiful thing and there is so much to smile about. -Marilyn Monroe            ',
            'Life is a long lesson in humility. -James M. Barrie            ',
            'In three words I can sum up everything I have learned about life: it goes on. -Robert Frost            ',
            'Love the life you live. Live the life you love. -Bob Marley            ',
            'Money can not buy life. -Bob Marley',
        ]
        let index = (Math.floor(Math.random() * Math.floor(quote.length)))
        const embed = new Discord.MessageEmbed()
        .setColor('00FFFF')
        .setTitle(quote[index])
        .setFields(`Quote for ${interaction.user.username}`)
        interaction.reply({ embeds: [embed] })
    }
}