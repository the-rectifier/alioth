const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('create-ctf')
        .setDescription('Create CTF Category with Given Name')
        .addStringOption(opt =>
            opt.setName('name')
                .setDescription('CTF Name')
                .setRequired(true)
        )
        .setDMPermission(false),
    async execute(interaction) {
        const ctf = interaction.options.data[0].value;

        const adminRole = await interaction.guild.roles.cache.find(role => role.name === 'Admin');
        const userId = await interaction.member.id;

        if (!adminRole.members.has(userId)) {
            await interaction.reply('Ε παρέα σάννα τζαι έφυε σου νάκκον!!');
            return;
        }

        // if (interaction.user. {
        //     await interaction.reply('Άντα μπου κάμνεις ρε σιυλλόπελλε!?!?');
        //     return;
        // }

        // console.log(interaction.user.id);

        const role = await interaction.guild.roles.create({
            name: `team-${ctf}`,
            color: '#222b3a',
        });

        const channel = await interaction.guild.channels.create(ctf, {
            type: "GUILD_CATEGORY",
            private: true,
            position: 2,
            permissionOverwrites: [
                {
                    id: interaction.guild.roles.everyone,
                    allow: [],
                    deny: ['VIEW_CHANNEL', 'SEND_MESSAGES'],
                }
            ]
        });


        const general = await interaction.guild.channels.create('general', {
            type: "GUILD_TEXT",
            parent: channel.id,
        });

        const channelId = channel.id;
        const roleId = role.id;
        const generalId = general.id;


        await interaction.reply(`Ε Κουλλή, βάρτες σιεφταλιές πάνω ρεεε τζαι έσιει CTF!!: ${ctf}`);

        const ctfData = {
            name: ctf,
            channelId: channelId,
            roleId: roleId,
            generalId: generalId,
            attendees: [],
            challenges: [],
        }

    }
}
