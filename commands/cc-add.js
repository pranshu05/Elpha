const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, Permissions } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('cc-add')
    .setDescription('Creates a custom command')
    .addSubcommand(subcommand => subcommand
      .setName('text')
      .setDescription('Text for the custom command')
      .addStringOption(option => option.setName('name').setDescription('Enter a name for the command').setRequired(true))
      .addStringOption(option => option.setName('text').setDescription('Enter text for the bot to say').setRequired(true))
      .addStringOption(option => option.setName('permissions').setDescription('Set the perms required to run the command').addChoice('User', 'user').addChoice('Staff', 'staff').addChoice('Admin', 'admin').setRequired(true))
      .addBooleanOption(option => option.setName('del-trigger').setDescription('Delets the trigger message')))
    .addSubcommand(subcommand => subcommand
      .setName('embed')
      .setDescription('Embed for the custom command')
      .addStringOption(option => option.setName('name').setDescription('Enter a name for the command').setRequired(true))
      .addStringOption(option => option.setName('description').setDescription('Enter description for the embed').setRequired(true))
      .addStringOption(option => option.setName('permissions').setDescription('Set the perms required to run the command').addChoice('User', 'user').addChoice('Staff', 'staff').addChoice('Admin', 'admin').setRequired(true))
      .addStringOption(option => option.setName('title').setDescription('Enter a title for the embed'))
      .addBooleanOption(option => option.setName('del-trigger').setDescription('Delets the trigger message'))),
  async execute(client, interaction, prisma) {

    let noperm = new MessageEmbed()
      .setDescription(`<:cross:782029257739599873> You do not have permission to use this command!`)
      .setColor("RED")

   if (!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD)) { return interaction.reply({ embeds: [noperm], ephemeral: true }) }

    if (interaction.options.getSubcommand() === 'text') {
      const name = interaction.options.getString('name')
      const text = interaction.options.getString('text')
      const deltrig = interaction.options.getBoolean('del-trigger')
      const perms = interaction.options.getString('permissions')

      let triggertouse = `!${name}`

      const exists = await prisma.cCommands.findUnique({
        where: {
          placeholder: `${name + interaction.guild.id}`,
        },
        select: {
          guild: true
        }
      })

      if (exists) {

        if (exists.guild === interaction.guild.id) {
          let embed = new MessageEmbed()
            .setTitle("Command Error")
            .setDescription(`That command already exists!`)
            .setColor("RED")

          interaction.reply({ embeds: [embed] })
        }

      } else {

        if (text?.length >= 280 || name?.length >= 9) {
          let badembed = new MessageEmbed()
            .setTitle("Command Error")
            .setDescription(`The text provided is too long!`)
            .setFooter("Limit is 280 characters")
            .setColor("RED")

          return interaction.reply({ embeds: [badembed] });
        }

        await prisma.cCommands.create({
          data: {
            placeholder: `${name + interaction.guild.id}`,
            id: triggertouse,
            text: text,
            guild: interaction.guild.id,
            deltrig: deltrig,
            permission: perms,
            name: name
          },
        })

        let embed = new MessageEmbed()
          .setTitle("Command Made")
          .setDescription(`<:check:782029189963710464> Successfully made command with trigger **${triggertouse}**`)
          .setColor("GREEN")

        interaction.reply({ embeds: [embed] })
      }
    }

    if (interaction.options.getSubcommand() === 'embed') {
      const name = interaction.options.getString('name')
      const description = interaction.options.getString('description')
      let title = interaction.options.getString('title')
      const deltrig = interaction.options.getBoolean('del-trigger')
      const perms = interaction.options.getString('permissions')

      if (!title) {
        title = null
      }

      let triggertouse = `!${name}`

      const exists = await prisma.cCEmbeds.findUnique({
        where: {
          placeholder: `${name + interaction.guild.id}`
        },
        select: {
          guild: true
        }
      })

      if (exists) {

        if (exists.guild === interaction.guild.id) {
          let embed = new MessageEmbed()
            .setTitle("Command Error")
            .setDescription(`That command already exists!`)
            .setColor("RED")

          interaction.reply({ embeds: [embed] })
        }

      } else {

        if (description?.length >= 280 || name?.length >= 9 || title?.length >= 30) {
          let badembed = new MessageEmbed()
            .setTitle("Command Error")
            .setDescription(`The text provided is too long!`)
            .setFooter("Limit is 280 characters")
            .setColor("RED")

          return interaction.reply({ embeds: [badembed] });
        }

        await prisma.cCEmbeds.create({
          data: {
            placeholder: `${name + interaction.guild.id}`,
            id: triggertouse,
            description: description,
            guild: interaction.guild.id,
            title: title,
            deltrig: deltrig,
            permission: perms
          },
        })

        let embed = new MessageEmbed()
          .setTitle("Command Made")
          .setDescription(`<:check:782029189963710464> Successfully made command with trigger **${triggertouse}**`)
          .setColor("GREEN")

        interaction.reply({ embeds: [embed] })
      }
    }
  },
};
