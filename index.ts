import dotenv from "dotenv";
import { AdministratorBot } from "./client";
import RankUser from "./models/RankUser";
import Levels from "./Levels";
dotenv.config();

process.on("uncaughException", () => {});

const bot = new AdministratorBot();
AdministratorBot.instance = bot;
bot.start();
