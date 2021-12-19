const { SlashCommandBuilder } = require('@discordjs/builders')

const { MessageActionRow, MessageSelectMenu } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('role')
        .setDescription('Get a list of reaction roles'),
    async execute(interaction , client) {
        const row = new MessageActionRow()
			.addComponents(
				new MessageSelectMenu()
					.setCustomId('select role!')
					.setPlaceholder('Nothing selected')
					.addOptions([
						{
							label: 'Youtuber',
							description: 'Select to get Youtuber role',
							value: 'Youtuber',
						},
						{
							label: 'Memer',
							description: 'Select to get Memer role',
							value: 'Memer',
						},
                        {
							label: 'Programmer',
							description: 'Select to get Programmer role',
							value: 'Programmer',
						},
                        {
							label: 'Gamer',
							description: 'Select to get Gamer role',
							value: 'Gamer',
						},
					]),
			)

		await interaction.reply({ content: 'Select the role which you want', components: [row] })
		
		
    }
	
}