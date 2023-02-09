import {
	CacheType,
	GuildBan,
	Interaction,
	SlashCommandBuilder,
	TextChannel,
	EmbedBuilder,
	Message,
} from "discord.js";
import { AdministratorBot } from "../client";
import RankUser from "../models/RankUser";
import Levels from "../Levels";

export default async function m_level(msg: Message) {
	if (msg.member?.user.bot) return;

	const id = msg.member?.id as string;
	let user: RankUser | undefined = Levels.GetUser(id);

	if (!user) {
		const rankUser: RankUser = {
			level: 0,
			user_id: id,
			xp: 0,
			xp_to_reach: Levels.default_amount,
		};

		Levels.SaveUser(rankUser);
		user = Levels.GetUser(id);
	}

	user!.xp += Levels.amount_each_msg;
	Levels.SaveUser(user!);

	if (user!.xp >= user!.xp_to_reach) {
		user!.xp = 0;
		user!.xp_to_reach += Levels.to_add_each_lvl_up;
		user!.level++;
		Levels.SaveUser(user!);

		const channel = (await msg.guild?.channels.fetch(
			"1049293658333126717"
		)) as TextChannel;
		channel.send(
			`<@${msg.member?.id}> has reached level **${user?.level}**`
		);

		if (user!.level == 10) {
			msg.member?.roles.add("1046353903077302282");
		} else if (user!.level == 20) {
			msg.member?.roles.add("1049284586217148417");
		} else if (user!.level == 40) {
			msg.member?.roles.add("1049284433636773919");
		} else if (user!.level == 50) {
			msg.member?.roles.add("1071860921854607440");
		}
	}
}
