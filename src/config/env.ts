import * as fs from "fs";

import * as Joi from "joi";

export interface EnvConfig {
	PORT: number;
	DB_URL: string;
}

export interface Config {
	port: number;
	dbUrl: string;
}

export function getEnv(configUri: string) {
	const configBuffer = fs.readFileSync(configUri, "utf8");

	const config = JSON.parse(configBuffer) as EnvConfig;

	const schema = Joi.object<Config>({
		port: Joi.number().required(),
		dbUrl: Joi.string().required(),
	});

	return schema.validate({
		port: config.PORT,
		dbUrl: config.DB_URL,
	});
}
