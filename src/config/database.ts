import { KnexModuleOptions } from "nest-knexjs";

import { getEnv } from "./env";

export function getDatabaseConfig(configUri: string) {
	const { value } = getEnv(configUri);

	const databaseConfig: KnexModuleOptions = {
		config: {
			client: "postgresql",
			connection: value.dbUrl,
			pool: {
				min: 2,
				max: 10,
			},
		},
	};

	return databaseConfig;
}
