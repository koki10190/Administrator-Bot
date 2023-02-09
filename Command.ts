import { CacheType, Interaction, SlashCommandBuilder } from "discord.js";

interface Command {
	data: SlashCommandBuilder;
	execute: (interaction: Interaction<CacheType>) => void;
}

export default Command;
