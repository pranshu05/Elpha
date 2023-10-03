const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName(`echo`)
        .setDescription(`Sends your message to a specified channel`)
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
        .addStringOption((option) =>
            option
                .setName(`message`)
                .setDescription(`The message you want to echo`)
                .setRequired(true)
        )
        .addChannelOption((option) =>
            option
                .setName(`channel`)
                .setDescription(`Channel to send the message`)
                .setRequired(false)
        ),
    async execute(interaction) {
        const message = interaction.options.getString(`message`);

        const channel =
            interaction.options.getChannel(`channel`) || interaction.channel;

        if (
            !channel
                .permissionsFor(interaction.guild.members.me)
                .has([
                    PermissionFlagsBits.ViewChannel,
                    PermissionFlagsBits.SendMessages,
                ])
        ) {
            await interaction.reply({
                content: `❌ I do not have permissions to send message in that channel`,
                ephemeral: true,
            });
        } else {
            try {
                await channel.send(message);
                interaction.reply({
                    content: `✅ Successfully sent the message!`,
                    ephemeral: true,
                });
            } catch (error) {
                await interaction.reply({
                    content: `❌ Unable to send the message`,
                    ephemeral: true,
                });
            }
        }
    },
};
