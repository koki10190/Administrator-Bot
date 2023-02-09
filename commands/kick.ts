import {
	CacheType,
	EmbedBuilder,
	GuildMemberRoleManager,
	Interaction,
	SlashCommandBuilder,
	TextChannel,
} from "discord.js";
import Command from "../Command";
import RankUser from "../models/RankUser";
import { AdministratorBot } from "../client";

const cmd: Command = {
	data: new SlashCommandBuilder()
		.setName("kick")
		.addUserOption(option =>
			option
				.setName("user")
				.setDescription("The user to kick")
				.setRequired(true)
		)
		.addStringOption(option =>
			option
				.setName("reason")
				.setDescription("Reason for the kick")
				.setRequired(false)
		)
		.setDescription("Kicks the user"),
	async execute(interaction: Interaction<CacheType>) {
		if (!interaction.isCommand()) return;
		const roles = interaction.member?.roles as GuildMemberRoleManager;
		let is_mod = false;
		for (const id of AdministratorBot.instance.mod_roles) {
			if (roles.cache.find(x => x.id == id)) {
				is_mod = true;
				break;
			}
		}

		if (!is_mod) {
			await interaction.reply({
				content: "You cannot use this command!",
				ephemeral: true,
			});
			return;
		}

		const user = interaction.options.getUser("user");
		const reason =
			interaction.options.get("reason")?.value ??
			"No Reason";

		const member = interaction.guild?.members.cache.find(
			x => x.id == user!.id
		);

		const embed = new EmbedBuilder()
			.setColor("Red")
			.setDescription(
				`You were kicked from ${interaction.guild?.name} | ${reason}`
			);

		try {
			member?.send({ embeds: [embed] });
		} catch (err) {
			console.log(
				"Couldn't send message to " +
					member?.user.tag
			);
		}

		try {
			member?.kick(reason as string).catch(() => {});
		} catch (err) {
			console.error(err);
		}

		await interaction.reply({
			content: `**${user?.tag} has been kicked**`,
		});
	},
};

export default cmd;
