import { ArgumentsHost, Catch, HttpServer, Logger } from "@nestjs/common";
import { HttpException } from "@nestjs/common/exceptions";
import { BaseExceptionFilter } from "@nestjs/core";

export interface ResponseStatus {
	json(a: Record<string, unknown>): object;
}

export interface Response {
	status(a: number): ResponseStatus;
	req: {
		originalUrl: string;
	};
}

export interface Message {
	statusCode: number;
	message: string;
	error: string;
}

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
	constructor(applicationRef: HttpServer) {
		super(applicationRef);
	}

	catch(exception: unknown, host: ArgumentsHost) {
		const ctx = host.switchToHttp();

		const response = ctx.getResponse<Response>();

		try {
			const errorData = {
				data: {},
				status: 500,
				message: {
					statusCode: 500,
					message: "error",
					error: "InternalServer error",
				},
			};

			if (exception instanceof HttpException) {
				errorData.message = exception.getResponse() as Message;
				errorData.status = 500;
			} else {
				errorData.message = {
					statusCode: exception["status"] as number,
					message: exception["message"] as string,
					error: "InternalServer error",
				};
				errorData.status = (exception["status"] as number) || 500;
			}

			Logger.error({
				message: errorData.message,
				status: errorData.status,
				user: "none",
				stack: exception,
				context: `${AllExceptionsFilter.name} url ${response.req.originalUrl}`,
			});

			return response.status(errorData.status).json(errorData);
		} catch (error) {
			const errorData = {
				data: {},
				status: error["status"] as number,
				message: error["message"] as string,
			};
			Logger.error({
				message: errorData.message,
				status: errorData.status,
				user: "none",
				stack: error,
				context: `${AllExceptionsFilter.name} url ${response?.req?.originalUrl} catch`,
			});
			return response.status(errorData.status || 500).json(errorData);
		}
	}
}
