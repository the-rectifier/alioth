const fs = require("node:fs");
const path = require("node:path");
const { Client, Collection, Intents } = require("discord.js");
const { clientId, token, dbPassword, dbUser } = require("./config.json");
const { MongoClient } = require('mongodb');

const client = new Client({
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.DIRECT_MESSAGES,
		Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
	],
});

client.commands = new Collection();
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs
	.readdirSync(commandsPath)
	.filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	client.commands.set(command.data.name, command);
}

client.once("ready", () => {
	console.log("Ready!");
});

client.on("messageCreate", async (message) => {
	if (message.author.bot) return;

	if (
		message.content.includes("@everyone") ||
		message.content.includes("@here")
	)
		return;

	if (message.mentions.users.has(clientId)) {
		message.reply("Φύε Φέρμου Φραπέ!");
	}
});

client.on("interactionCreate", async (interaction) => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) {
		await interaction.reply({
			content: "Mase fallarismenos re",
			ephemeral: false,
		});
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({
			content: "There was an error while executing this command!",
			ephemeral: true,
		});
	}
});

client.login(token);
