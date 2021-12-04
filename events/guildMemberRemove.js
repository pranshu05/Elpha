module.exports = {
	name: "guildMemberRemove",
	async execute(member) {
		member.guild.channels.cache.get("862296895665340467").send(`${member.user} has left the server!`);
	}
}