import Discord, {
	ActivityType,
	Client,
	Collection,
	Message,
	PresenceUpdateStatus,
} from "discord.js";
import dotenv from "dotenv";
dotenv.config();
import { REST, Routes } from "discord.js";
import fs from "node:fs";
import Command from "./Command";
import m_interaction from "./events/interaction";
import m_msg_delete from "./events/messageDelete";
import m_msg_edited from "./events/messageEdited";
import m_ban from "./events/banEvent";
import m_status from "./events/setStatus";
import m_level from "./events/levelUp";

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN as string);

class AdministratorBot extends Client {
	static instance: AdministratorBot;
	clientId: string = process.env.CLIENT_ID as string;
	guildId: string = process.env.GUILD_ID as string;
	commands: Array<object> = [];
	m_command_collection: Collection<string, Command> = new Collection();
	mod_roles = ["1072834482274586624", "1072834918696091698"];

	constructor() {
		super({ intents: 3276799 });
	}

	async start() {
		this.login(process.env.TOKEN);
		await this.registerModules();
		this.registerEvents();

		this.on("ready", m_status);
	}

	async registerModules() {
		const commandFiles = fs
			.readdirSync("commands")
			.filter(x => x.endsWith(".ts"));

		for (const file of commandFiles) {
			const m_file: Command = require("./commands/" +
				file).default;
			console.log(m_file);
			this.m_command_collection.set(
				m_file.data.name,
				m_file
			);
			this.commands.push(m_file.data.toJSON());
		}

		try {
			console.log(`Started refreshing commands.`);

			// The put method is used to fully refresh all commands in the guild with the current set
			const data = await rest.put(
				Routes.applicationGuildCommands(
					this.clientId,
					this.guildId
				),
				{
					body: this.commands,
				}
			);

			console.log(`Successfully reloaded commands.`);
		} catch (error) {
			console.error(error);
		}
	}

	async registerEvents() {
		this.on("interactionCreate", m_interaction);
		this.on("messageDelete", m_msg_delete);
		this.on("messageUpdate", m_msg_edited);
		this.on("guildBanAdd", m_ban);
		this.on("messageCreate", m_level);
	}
}

export { AdministratorBot };
