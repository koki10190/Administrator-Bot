import fs from "node:fs";
import levels from "./levels.json";
import RankUser from "./models/RankUser";

class Levels {
	static default_amount = 1000;
	static to_add_each_lvl_up = 500;
	static amount_each_msg = 2.5;

	static SaveUser(user: RankUser) {
		let m_user: RankUser | undefined = undefined;
		m_user = levels.find((x: RankUser) => x.user_id == user.user_id);
		if (m_user) {
			levels[levels.indexOf(m_user as never)] =
				user as never;
		} else {
			levels.push(user as never);
		}

		fs.writeFileSync("./levels.json", JSON.stringify(levels));
	}

	static GetUser(id: string): RankUser | undefined {
		let m_user: RankUser | undefined;
		m_user = levels.find((x: RankUser) => x.user_id == id);

		return m_user;
	}
}

export default Levels;
