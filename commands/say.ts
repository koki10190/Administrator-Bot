import {
	CacheType,
	GuildMemberRoleManager,
	Interaction,
	SlashCommandBuilder,
	TextChannel,
} from "discord.js";
import Command from "../Command";
import RankUser from "../models/RankUser";

const cmd: Command = {
	data: new SlashCommandBuilder()
		.setName("say")
		.addStringOption(option =>
			option
				.setName("text")
				.setDescription("Announcement")
				.setRequired(true)
		)
		.setDescription("Announcement"),
	async execute(interaction: Interaction<CacheType>) {
		if (!interaction.isCommand()) return;
		const roles = interaction.member?.roles as GuildMemberRoleManager;
		if (!roles.cache.find(x => x.id == "1072834482274586624")) {
			await interaction.reply({
				content: "Only admins can use this command!",
				ephemeral: true,
			});
			return;
		}
		const channel = (await interaction.guild?.channels.fetch(
			"1049282678568009790"
		)) as TextChannel;

		const option = interaction.options.get("text");
		channel.send(option?.value as string);

		await interaction.reply({
			content: "The announcement has been sent",
			ephemeral: true,
		});
	},
};

export default cmd;
