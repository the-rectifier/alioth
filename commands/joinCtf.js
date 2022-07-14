const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('join-ctf')
        .setDescription('Join CTF with Given Name')
        .addStringOption(opt =>
            opt.setName('name')
                .setDescription('CTF Name')
                .setRequired(true)
        )
        .setDMPermission(false),
    async execute(interaction) {
        const ctf = await interaction.options.data[0].value;
        const ctfs = await interaction.guild.roles.cache.find(role => role.name === `team-${ctf}`);
        // console.log(ctfs);

        if (ctfs === undefined) {
            await interaction.reply('Ανταμπουκάμνεις ρε σιυλλόπελλε, εν έσιει έτσι πράμα!');
            return;
        }

        if (interaction.member.roles.cache.has(ctfs.id)) {
            await interaction.reply('Μά \'σαι μεθυσμένος ρρε!! Είσαι ήδη μέσα!!');
            return;
        }

        await interaction.member.roles.add(ctfs);
        await interaction.reply('Άτε πέππο μου!');
    }
}
