const { SlashCommandBuilder } = require('@discordjs/builders')
const Discord = require('discord.js')
module.exports = {
    data: new SlashCommandBuilder()
    .setName('8ball')
    .setDescription('A magic 8ball command 🎱')
    .addStringOption(option => 
        option
        .setName("question")
        .setDescription("8ball question")
        .setRequired(true)
        ),
	async execute(interaction) {
        let eball = [
            'It is certain.',
            'It is decidedly so.',
            'Without a doubt.',
            'Yes definitely.',
            'You may rely on it.',
            'As I see it, yes.',
            'Most likely.',
            'Outlook good.',
            'Yes.',
            'Signs point to yes.',
            'Reply hazy try again.',
            'Ask again later.',
            'Better not tell you now.',
            'Cannot predict now.',
            'Concentrate and ask again.',
            'Don\'t count on it.',
            'My reply is no.',
            'My sources say no.',
            'Outlook not so good.',
            'Very doubtful.',
            'No way.',
            'Maybe',
            'The answer is hiding inside you',
            'No.',
            'Depends on the mood of the CS god',
            '||No||',
            '||Yes||',
            'Hang on',
            'It\'s over',
            'It\'s just the beginning',
            'Good Luck',
            'Probably.',
            'I don\'t think i am allowed to tell you that. Sorry.',
            'Hell to the yes.',
            'What? N-No.',
            'Okay there miiight be a *slight* possibility.',
            'I guess yeah. Ehhhh don\'t count on it',
            'I.. don\'t know why would you think that i know about this. I\'m just a discord bot.',
            'Perhaps.',
            'Perhaps not.',
            'Does 2 + 2 equals to 4?',
            'Eh *maybe*.',
            'What why would you even think of such a thing.',
            'Of course!',
            'Deadass.',
            'Most Likely.',
            'Less Likely.',
            'Uhm not sure about that one lol.',
            'Signs point to yes. Except that you were born an idiot',
            'Without a doubt. Nah, I’m just messing with you, go shoot yourself.',
            'My sources say no. They also tell me they hate you and hope you burn in hell.',
            'Yes, definitely. Unless it doesn’t happen. Listen it’s not my fault your father didn’t love you. Get off my back!',
            'Outlook not so good. Especially since you’re so goddamn ugly.',
            'All signs point to yes. But on second thought, go fuck yourself.',
            'As If', 
            'Ask Me If I Care', 
            'Dumb Question Ask Another', 
            'Forget About It', 
            'Get A Clue', 
            'In Your Dreams',  
            'Not A Chance', 
            'Obviously', 
            'Oh Please', 
            'Sure',
            'That\'s Ridiculous', 
            'Well Maybe', 
            'What Do You Think?', 
            'Yes... You Prick',
            'Who Cares?', 
            'Yeah And I\'m The Fucking Pope',
            'Yeah Right', 
            'You Wish', 
            'You\'ve Got To Be Kidding...',
        ]
        let index = (Math.floor(Math.random() * Math.floor(eball.length)))
        const embed = new Discord.MessageEmbed()
        .setColor('00FFFF')
        .setTitle(interaction.options.getString("question") )
        .setDescription(eball[index])
        interaction.reply({ embeds: [embed] })
	}
}