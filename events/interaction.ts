import { CacheType, Interaction, SlashCommandBuilder } from "discord.js";
import { AdministratorBot } from "../client";

export default function m_interaction(
	interaction: Interaction<CacheType>
): void {
	if (!interaction.isCommand()) return;
	const { commandName } = interaction;

	const command =
		AdministratorBot.instance.m_command_collection.get(
			commandName
		);

	try {
		if (command) command.execute(interaction);
	} catch (error) {
		console.error(error);
	}
}
