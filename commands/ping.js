const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Θωρεί αν έφκαλε ψόφο!'),
	async execute(interaction) {
		await interaction.reply('Ήρτεν ο Ζορόοοο ρεεεε, ΡΕΕΕΕ κουονουσμάες!!');
	},
};
