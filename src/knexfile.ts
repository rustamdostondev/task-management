import * as path from "path";

import { getDatabaseConfig } from "./config/database";

import type { Knex } from "knex";

const dbUrl = path.join(__dirname, "..", "config.json");

const dbConfig = getDatabaseConfig(dbUrl);

const config: { [key: string]: Knex.Config } = {
	development: {
		...dbConfig.config,
	},

	staging: {
		...dbConfig.config,
		migrations: {
			tableName: "knex_migrations",
		},
	},

	production: {
		...dbConfig.config,
	},
};

module.exports = config;
