const { SlashCommandBuilder } = require('@discordjs/builders')
const  Interaction  = require('discord.js')
const Discord = require('discord.js')
module.exports = {
    data: new SlashCommandBuilder()
    .setName('eval')
    .setDescription('Evaluates the code you put in!')
    .addStringOption(option => option.setName('code').setDescription('code to eval!').setRequired(true)),
    async execute(interaction, client){
        const code = interaction.options.getString('code') 
        const evaluated = eval(code)
        const clean = async (client, code) => {
            if (code && code.constructor.name == "Promise")
            code = await code
        }
        const cleaned = await clean(client, evaluated)
        const embed = new Discord.MessageEmbed()
        .setColor('#00FFFF')
        .setTitle('Evaluated successsfully!')
        .addFields(
            {name: 'To evaluate',value: `\`\`\`js ${code}\`\`\``},
            {name: 'Evaluated', value: `\`\`\`${cleaned}\`\`\``},
        )
        .setTimestamp()
        .setFooter(interaction.client.user.username, interaction.client.user.displayAvatarURL)
        const insf_perms = new Discord.MessageEmbed()
        .setColor('#FF0000')
	    .setTitle(`**:x: Insufficient Permission!**`)
        .setDescription(`You don't have permission to use this command.Only owner of this bot can use this command!`)
        try{
            if(interaction.user.id === '754381104034742415'){
                if(code === 'process.env.token') return interaction.reply('Using eval command for token is dangerous!')
                interaction.reply({embeds: [embed]})
            }else{
                interaction.reply({embeds: [insf_perms]})
            }
        }catch(e){
            const eval_err = new Discord.MessageEmbed()
            .setColor('#FF0000')
            .setTitle('An Error occured while executing the code!')
            .setFooter(interaction.client.user.username, interaction.client.user.displayAvatarURL)
            interaction.reply({embeds: [eval_err]})
            console.log(e)
        }
    }
}