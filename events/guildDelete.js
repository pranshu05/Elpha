module.exports = {
	name: "guildDelete",
	async execute(guild) {
		if(guild.available){
			console.log(`Server left: ${guild.name}`)
		}
	}
}