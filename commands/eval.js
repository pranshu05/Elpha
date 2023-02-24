const { SlashCommandBuilder } = require('@discordjs/builders')
const Interaction = require('discord.js')
const Discord = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('eval')
        .setDescription('Evaluates the code you put in!')
        .addStringOption((option) =>
            option
                .setName('code')
                .setDescription('code to eval!')
                .setRequired(true)
        ),
    async execute(interaction, client) {
        const code = interaction.options.getString('code')
        const insf_perms = new Discord.MessageEmbed()
            .setColor('#FF0000')
            .setTitle(`**:x: Insufficient Permission!**`)
            .setDescription(
                `You don't have permission to use this command.Only owner of this bot can use this command!`
            )
        if (interaction.user.id !== '754381104034742415')
            return interaction.reply({ embeds: [insf_perms] })
        try {
            if (code.includes('token'))
                return interaction.reply(
                    'Using eval command for token is dangerous!'
                )
            let evaled = eval(code)
            if (typeof evaled !== 'string')
                evaled = require('util').inspect(evaled)
            if (evaled.length > 1024)
                evaled = `Evaluated value is too big to display!`
            const eval_embed = new Discord.MessageEmbed()
                .setColor('#00FFFF')
                .setTitle('Evaluated successsfully!')
                .addFields(
                    { name: 'To evaluate', value: `\`\`\`js\n ${code}\`\`\`` },
                    { name: 'Evaluated', value: `\`\`\`${evaled}\`\`\`` }
                )
                .setTimestamp()
                .setFooter(
                    interaction.client.user.username,
                    interaction.client.user.displayAvatarURL()
                )
            interaction.reply({ embeds: [eval_embed] })
        } catch (e) {
            if (e.length > 1024) e = `The error is too big to display!`
            const eval_err = new Discord.MessageEmbed()
                .setColor('#FF0000')
                .setTitle('An Error occured while evaluating the code!')
                .setDescription(`\`ERROR\` \`\`\`xl\n${e}\n\`\`\``)
                .setFooter(
                    interaction.client.user.username,
                    interaction.client.user.displayAvatarURL()
                )
            interaction.reply({ embeds: [eval_err] })
        }
    },
}
