import * as path from "path";

import { Logger, ValidationPipe } from "@nestjs/common";
import { HttpAdapterHost, NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as bodyParser from "body-parser";
import { WinstonModule } from "nest-winston";
import * as winston from "winston";

import { AllExceptionsFilter } from "libs/error-handler";

import { getEnv } from "../config/env";
import { transports } from "../libs/logService";

import { AppModule } from "./app.module";

export default class ApplicationModule {
	public static async main(): Promise<void> {
		const logger = new Logger("main");

		const validateResult = getEnv(
			path.join(__dirname, "..", "..", "..", "config.json"),
		);

		if (validateResult.error) {
			logger.error(validateResult.error);
			process.exit(1);
		}

		const app = await NestFactory.create(AppModule);

		app.enableCors({
			origin: "*",
		});

		app.useGlobalPipes(
			new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
		);

		const { httpAdapter } = app.get(HttpAdapterHost);

		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-call
		app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

		const options = new DocumentBuilder()
			.setTitle("Taskmanagenmt")
			.setDescription("/api-swagger-json")
			.setVersion("0.0.1")
			.addTag("auth")
			.addApiKey(
				{ type: "apiKey", name: "ac-token", in: "header" },
				"ac-token",
			)
			.build();

		const document = SwaggerModule.createDocument(app, options);
		SwaggerModule.setup("api-swagger", app, document, {
			swaggerOptions: {
				persistAuthorization: true,
			},
		});

		app.use(bodyParser.json({ limit: "20mb" }));
		app.use(bodyParser.urlencoded({ limit: "20mb", extended: true }));

		app.useLogger(
			WinstonModule.createLogger({
				format: winston.format.combine(
					winston.format.timestamp({
						format: "YYYY-MM-DD HH:mm:ss",
					}),
					winston.format.errors({ stack: true }),
					winston.format.splat(),
					winston.format.json(),
				),
				transports: [
					transports.console,
					transports.combinedFile,
					transports.errorFile,
					transports.fatalFile,
				],
			}),
		);

		const { port } = validateResult.value;

		await app.listen(port, () => {
			logger.log(`Server url: http://localhost:${port}`);
			logger.log(
				`Server swagger url: http://localhost:${port}/api-swagger`,
			);
		});
	}
}
