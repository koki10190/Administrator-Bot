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
import timestring from "timestring";

const cmd: Command = {
	data: new SlashCommandBuilder()
		.setName("mute")
		.addUserOption(option =>
			option
				.setName("user")
				.setDescription("The user to mute")
				.setRequired(true)
		)
		.addStringOption(option =>
			option
				.setName("time")
				.setDescription(
					"Mute amount, e.g: (5m, 1d, 1h 5m)"
				)
				.setRequired(true)
		)
		.addStringOption(option =>
			option
				.setName("reason")
				.setDescription("Reason for the mute")
				.setRequired(false)
		)
		.setDescription("Timeouts the user"),
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
		const time = interaction.options.get("time")?.value as string;

		const member = interaction.guild?.members.cache.find(
			x => x.id == user!.id
		);

		const embed = new EmbedBuilder()
			.setColor("Red")
			.setDescription(
				`You were muted in ${interaction.guild?.name} | ${reason} | For ${time}`
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
			member?.timeout(
				timestring(time, "ms"),
				reason as string
			).catch(() => {});
		} catch (err) {
			console.error(err);
		}

		await interaction.reply({
			content: `**${user?.tag} has been muted**`,
		});
	},
};

export default cmd;
