import { CacheType, Interaction, SlashCommandBuilder } from "discord.js";
import Command from "../Command";
import RankUser from "../models/RankUser";
import levels from "../levels.json";
import Levels from "../Levels";
import { RankCardBuilder } from "discord-card-canvas";

const cmd: Command = {
	data: new SlashCommandBuilder()
		.setName("rank")
		.addUserOption(option =>
			option
				.setName("user")
				.setDescription("Shows this users rank")
				.setRequired(false)
		)
		.setDescription("Shows the rank card"),
	async execute(interaction: Interaction<CacheType>) {
		if (!interaction.isCommand()) return;

		const user =
			interaction.options.getUser("user", false) ??
			interaction.member?.user;

		const rank_user: RankUser | undefined = Levels.GetUser(
			user?.id as string
		);

		if (!rank_user) {
			await interaction.reply({
				content: `<@${user?.id}> does not have a rank!`,
				ephemeral: true,
			});
			return;
		}

		const levels_copy = [...levels];
		levels_copy.sort((a: any, b: any) => a - b);
		let rank = levels_copy.findIndex(
			(x: RankUser) => x.user_id == rank_user!.user_id
		);
		rank++;

		const canvas_rank = await new RankCardBuilder({
			currentLvl: rank_user!.level,
			currentRank: rank,
			currentXP: rank_user!.xp,
			requiredXP: rank_user!.xp_to_reach,
			backgroundImgURL: "https://i.imgur.com/jsN7O5c.jpg",
			avatarImgURL: user?.avatar
				? "https://cdn.discordapp.com/avatars/" +
				  user?.id +
				  "/" +
				  user?.avatar
				: "https://i.imgur.com/IimBPOH.png",
			nicknameText: {
				content: user!.username,
				font: "Nunito",
				color: "#0CA7FF",
			},
			userStatus: "idle",
		}).build();

		await interaction.reply({
			files: [
				{
					attachment: canvas_rank.toBuffer(),
					name: "rank.png",
				},
			],
		});
	},
};

export default cmd;
