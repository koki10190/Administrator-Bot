import {
	CacheType,
	GuildBan,
	Interaction,
	SlashCommandBuilder,
	TextChannel,
	EmbedBuilder,
} from "discord.js";
import { AdministratorBot } from "../client";

export default async function m_ban(ban: GuildBan) {
	const channel = (await ban.guild?.channels.fetch(
		"1072915289597026426"
	)) as TextChannel;

	const embed = new EmbedBuilder()
		.setColor("Red")
		.setTimestamp()
		.setTitle("Member Banned")
		.setAuthor({
			name: ban.user.tag as string,
			iconURL: ban.user.avatarURL()
				? (ban.user.avatarURL() as string)
				: (ban.user.defaultAvatarURL as string),
		})
		.setDescription(
			`User ID: **${ban.user.id}**\n\Reason:\n\`\`\`${ban.reason}\`\`\``
		);

	channel.send({ embeds: [embed] });
}
