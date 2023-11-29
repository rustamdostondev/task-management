import * as winston from "winston";
import * as winstonDailyRotateFile from "winston-daily-rotate-file";

export const transports = {
	console: new winston.transports.Console({
		level: "silly",
		format: winston.format.combine(
			winston.format.timestamp({
				format: "YYYY-MM-DD HH:mm:ss",
			}),
			winston.format.colorize({
				colors: {
					info: "blue",
					debug: "yellow",
					error: "red",
				},
			}),
			winston.format.printf((info) => {
				return `${info["timestamp"] as string} [${info.level}] [${
					(info["context"] as string)
						? (info["context"] as string)
						: (info["stack"] as string)
				}] ${info.message as string}`;
			}),
		),
	}),
	combinedFile: new winstonDailyRotateFile({
		dirname: "logs",
		filename: "combined",
		extension: ".log",
		level: "info",
	}) as winstonDailyRotateFile,
	errorFile: new winstonDailyRotateFile({
		dirname: "logs",
		filename: "error",
		extension: ".log",
		level: "error",
	}) as winstonDailyRotateFile,
	fatalFile: new winstonDailyRotateFile({
		dirname: "logs",
		filename: "fatal",
		extension: ".log",
		level: "fatal",
	}) as winstonDailyRotateFile,
};
