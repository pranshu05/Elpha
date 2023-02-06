const { SlashCommandBuilder } = require('@discordjs/builders')
const Discord = require('discord.js')
module.exports = {
    data: new SlashCommandBuilder()
    .setName('roast')
    .setDescription('Roast someone')
    .addUserOption(option =>
        option.setName('user')
            .setDescription('user id')
            .setRequired(true)
    ),
    async execute(interaction) {
        var user = interaction.options.getUser('user')
        let roast = [
           ' my IQ is greater than your weight.',
           ' your ass must be jealous of all the shit that comes out of your mouth',
           ' did you hear that? It’s the sound of no one caring…',
           ' you have a face not even a mother could love.',
           ' if i am ever drunk, you will be damn good looking.',
           ' I can get a plastic surgery to fix my ugliness, you on the other hand will be stupid for eternity.',
           ' I am not being rude. You are just insignificant.',
           ' at least I smell good.',
           ' I love what you’ve done with your hair. How do you get it to come out of the nostrils like that?',
           ' stupidity isn’t a crime, so you’re free to go.',
           ' if I had a face like yours I’d sue my parents.',
           ' you bring everyone a lot of joy, when you leave the room.',
           ' I’m jealous of all the people that haven’t met you!',
           ' shock me, say something intelligent.',
           ' damn not you again.',
           ' I fart to make you smell better.',
           ' yeah you’re pretty, pretty stupid.',
           ' 100,000 sperm, you were the fastest?',
           ' your only purpose in life is as an organ donor.',
           ' have a nice day, somewhere else.',
           ' if you really want to know about mistakes, you should ask your parents.',
           ' please, keep talking. I always yawn when I am interested.',
           ' Jesus loves you… but everyone else thinks you’re an asshole.',
           ' you have the right to remain silent because whatever you say will probably be stupid anyway.           ',
           ' I had a nightmare. I dreamed I was you.',
           ' you have enough fat to make another human.',
           ' I am not anti-social. I just don’t like you.',
           ' it’s scary to think that people like you are graduating from college.           ',
           ' I don’t have the time or the crayons to explain this to you.',
           ' you’re so ugly your portraits hangs themselves.',
           ' your face could scare the shit out of a toilet!',
           ' you were the sperm that won?',
           ' if laughter has the best medicine, your face must be curing the world.',
           ' you must have been born on a Highway, because that’s where most accidents happen.',
           ' mirror can’t talk. Lucky for you, they can’t laugh either.',
           ' hey, you have something on your chin.. no, the 3rd one down.',
           ' you’re as useless as the ‘ueue’ in ‘queue’.',
           ' are you always such an idiot, or do you just show off when I’m around?',
           ' my favourite colour is yellow. That’s why I love your teeth.           ',
        ]
        if (user.id === '754381104034742415') {return interaction.reply('You cannot roast my developer')}
        if (user === interaction.user) return interaction.reply('You cannot roast yourself')
        if (user === interaction.client.user) return interaction.reply('You cannot roast me')
        let index = (Math.floor(Math.random() * Math.floor(roast.length)))
        const embed = new Discord.MessageEmbed()
        .setColor('00FFFF')
        .setTitle(user.username + roast[index] )
        interaction.reply({ embeds: [embed] })
    }
}