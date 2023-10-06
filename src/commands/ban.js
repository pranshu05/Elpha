const {
    SlashCommandBuilder,
    PermissionFlagsBits,
    Interaction,
} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName(`ban`)
        .setDescription(`Bans a member from the server`)
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
        .addUserOption((option) =>
            option
                .setName(`target-user`)
                .setDescription(`The user you want to ban`)
                .setRequired(true)
        )
        .addStringOption((option) =>
            option
                .setName(`reason`)
                .setDescription(`The reason for ban`)
                .setRequired(false)
        ),
    /**
     *
     * @param {Interaction} interaction
     */
    async execute(interaction) {
        const targetUserId = interaction.options.getUser(`target-user`);
        const reason =
            interaction.options.getString(`reason`) || "No reason provided";

        await interaction.deferReply();

        // Checking of bot has permissions to ban members
        if (
            !interaction.guild.members.me.permissions.has(
                PermissionFlagsBits.BanMembers
            )
        ) {
            await interaction.editReply({
                content: "⚠️ I do not have the permissions to ban members",
            });
            return;
        }

        // Check if user has already left the server
        const targetUser = await interaction.guild.members.fetch(targetUserId);
        if (!targetUser) {
            await interaction.editReply({
                content: "⚠️ That user is not present in this server!",
            });
            return;
        }

        // Check if user is server owner
        if (targetUser.id === interaction.guild.ownerId) {
            await interaction.editReply({
                content: "⚠️ Cannot ban the server owner!",
            });
            return;
        }

        // Checking if target is an admin
        if (
            targetUser.permissions.has([
                PermissionFlagsBits.Administrator,
                PermissionFlagsBits.BanMembers,
                PermissionFlagsBits.ModerateMembers,
            ])
        ) {
            interaction.editReply({
                content: "⚠️ Cannot ban an admin/mod!",
            });
            return;
        }

        // Fetching the highest role positions of all 3
        const targetUserRP = targetUser.roles.highest.position;
        const requestUserRP = interaction.member.roles.highest.position;
        const botRP = interaction.guild.members.me.roles.highest.position;

        // Check if target user has a higher role than the requested user
        if (
            interaction.member.id != interaction.guild.ownerId &&
            targetUserRP >= requestUserRP
        ) {
            await interaction.editReply({
                content: "⚠️ Cannot ban a member with a higher role than you",
            });
            return;
        }

        // Check if target user has higher role than bot
        if (targetUserRP >= botRP) {
            await interaction.editReply({
                content: "⚠️ Cannot ban a member with a higher role than me!",
            });
            return;
        }

        // All conditions have been checked, ban the user
        try {
            await targetUser.ban({ reason });
            await interaction.editReply(
                `🟢️ User ${targetUser} was banned\nReason: ${reason}`
            );
        } catch (err) {
            await interaction.editReply({
                content:
                    "⚠️ Some unknown error occured, could not ban that member!",
            });
        }
    },
};
