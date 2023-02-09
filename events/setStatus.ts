import {
	CacheType,
	GuildBan,
	Interaction,
	SlashCommandBuilder,
	TextChannel,
	EmbedBuilder,
	PresenceUpdateStatus,
	ActivityType,
} from "discord.js";
import { AdministratorBot } from "../client";

export default async function m_status() {
	AdministratorBot.instance.user?.setStatus(PresenceUpdateStatus.DoNotDisturb);
	AdministratorBot.instance.user?.setActivity({
		name: "Team Fortress 2",
		url: "https://www.twitch.tv/monstercat",
		type: ActivityType.Streaming,
	});
}
