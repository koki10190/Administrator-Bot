import { CacheType, Interaction, SlashCommandBuilder } from "discord.js";
import Command from "../Command";

const cmd: Command = {
	data: new SlashCommandBuilder()
		.setName("ping")
		.setDescription("Responds with Pong"),
	async execute(interaction: Interaction<CacheType>) {
		if (interaction.isRepliable())
			await interaction.reply({
				content: "Pong",
			});
	},
};

export default cmd;
