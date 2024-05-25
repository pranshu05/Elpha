const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('riddle')
    .setDescription('Get a random riddle with the answer'),
    async execute(interaction) {
        const riddle1 = "How many 9's are there between 1 and 100?"
        const riddle1_answer = "20"
        const riddle2 = "I'm a number with couple of friends, quarter a dozen, and you'll find me again?"
        const riddle2_answer = "3"
        const riddle3 = "What is half of two plus two?"
        const riddle3_answer = "3"
        const riddle4 = "An apple is 40 cents, a banana is 60 cents and a grapefruit is 80. How much is a pear?"
        const riddle4_answer = "40 cents. The price of each fruit is calculated by multiplying the number of vowels by 20c."
        const riddle5 = "If you're 8 feet away from a door and with each move you advance half the distance to the door. How many moves will it take to reach the door?"
        const riddle5_answer = "You will never reach the door, it will always be half the distance, no matter how small!."
        const riddle6 = "In a bicycle race, the man who came two places in front of the last man finished one ahead of the man who came fifth. How many contestants were there?"
        const riddle6_answer = "There were 6 contestants. The man came in 4th place."
        const riddle7 = "My daughter has many sisters. She has as many sisters as she has brothers. Each of her brothers has twice as many sisters as brothers. How many sons and daughters do I have?"
        const riddle7_answer = "Four daughters and three sons. Each daughter has 3 sisters and 3 brothers, and each brother has 2 brothers and 4 sisters."
        const riddle8 = "There are 25 red balls, 47 green balls and 3 blue balls in a basket. There is a blind man. What is the minimum number of balls that the blind man has to pick to make sure that there are at least 2 balls of different colors?"
        const riddle8_answer = "48 balls. There is a small chance he may pick up 47 green balls in a row."
        const riddle9 = "You have 14 brown socks, 14 blue socks and 14 black socks in your sock drawer. How many socks must you remove (without looking to be sure) to have a matched pair?"
        const riddle9_answer = "4"
        const riddle10 = "How can you add eight 8's to get the number 1000?"
        const riddle10_answer = "888 + 88 + 8 + 8 + 8 = 1000"

        const riddle_questions = [ riddle1, riddle2, riddle3, riddle4, riddle5, riddle6, riddle7, riddle8, riddle9, riddle10]

        const random_riddle_index = Math.floor(Math.random() * riddle_questions.length)

        const random_riddle = riddle_questions[random_riddle_index];

        let random_riddle_answer;

        if (random_riddle === riddle1) {
            random_riddle_answer = riddle1_answer;
        } else if (random_riddle === riddle2) {
            random_riddle_answer = riddle2_answer;
        } else if (random_riddle === riddle3) {
            random_riddle_answer = riddle3_answer;
        } else if (random_riddle === riddle4) {
            random_riddle_answer = riddle4_answer;
        } else if (random_riddle === riddle5) {
            random_riddle_answer = riddle5_answer;
        } else if (random_riddle === riddle6) {
            random_riddle_answer = riddle6_answer;
        } else if (random_riddle === riddle7) {
            random_riddle_answer = riddle7_answer;
        } else if (random_riddle === riddle8) {
            random_riddle_answer = riddle8_answer;
        } else if (random_riddle === riddle9) {
            random_riddle_answer = riddle9_answer;
        } else if (random_riddle === riddle10) {
            random_riddle_answer = riddle10_answer;
        }

        // Now you can use random_riddle_answer outside the if conditions
        console.log(random_riddle_answer);


        const riddle_embed = new EmbedBuilder()
        .setTitle('RIDDLE')
        .addFields(
            { name: `Riddle:`, value: `${random_riddle}`}
        )
        .setColor('Gold')
        .setTimestamp()
        const answer_button = new ButtonBuilder()
        .setLabel('answer')
        .setStyle(ButtonStyle.Primary)
        .setCustomId('answer_button_clicked')
        const row = new ActionRowBuilder().addComponents( answer_button )
        const response = await interaction.reply( { embeds : [ riddle_embed ], components : [ row ] } )

        const interaction_channel = interaction.channel

        const collectorFilter = i => i.user.id === interaction.user.id;

        try {
            const confirmation = await response.awaitMessageComponent( { filter: collectorFilter } )

            if (confirmation.customId === 'answer_button_clicked') {
                const updated_embed = new EmbedBuilder()
                .setTitle('RIDDLE')
                .setFields(
                    { name: `Riddle:`, value: `${random_riddle}`},
                    { name: `Riddle Answer:`, value: `${random_riddle_answer}`}
                )
                .setColor('Gold')
                .setTimestamp()
                .setFooter( { text : 'More Riddles will be added in the future' } )
                await interaction_channel.send( { embeds : [ updated_embed ] } )
            }
        } catch (e) {
            console.log(e)
        }
    }
}