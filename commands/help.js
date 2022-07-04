const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Display Help Menu!')
        .setDMPermission(true),
    async execute(interaction) {
        await interaction.reply("\`\`\`Slash Command\t\tAction\n\
        ping\t\tReplies if alive\n\
        help\t\tDisplay this menu\n\
        create-ctf <name>\t\tCreate a new CTF\n\
        join-ctf <name>\t\tJoin a CTF\n\
        \`\`\`");
    }
}