import {
	CacheType,
	EmbedBuilder,
	Interaction,
	Message,
	PartialMessage,
	SlashCommandBuilder,
	TextChannel,
} from "discord.js";
import { AdministratorBot } from "../client";

export default async function m_msg_edited(
	msg: Message<boolean> | PartialMessage,
	msg_after: Message<boolean> | PartialMessage
) {
	if (msg.member?.user.bot) return;

	const channel = (await msg.guild?.channels.fetch(
		"1072915289597026426"
	)) as TextChannel;

	const embed = new EmbedBuilder()
		.setColor("Yellow")
		.setTimestamp()
		.setTitle("Message Deleted")
		.setAuthor({
			name: msg.member?.user.tag as string,
			iconURL: msg.member?.user.avatarURL()
				? (msg.member?.user.avatarURL() as string)
				: (msg.member?.user
						.defaultAvatarURL as string),
		})
		.setDescription(
			`User ID: **${msg.member?.id}**\n\nBefore:\n\`\`\`${msg.content}\`\`\`\n\nAfter:\n\`\`\`${msg_after.content}\`\`\``
		);

	channel.send({ embeds: [embed] });
}
