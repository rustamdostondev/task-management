import { ApiProperty } from "@nestjs/swagger";
import {
	IsDateString,
	IsEnum,
	IsInt,
	IsNotEmpty,
	IsString,
} from "class-validator";

import { Status } from "../../../common/status.enum";

export class CreateTaskDto {
	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	name: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsDateString()
	dueDate: Date;

	@ApiProperty()
	@IsNotEmpty()
	@IsDateString()
	doneAt: Date;

	@ApiProperty()
	@IsNotEmpty()
	@IsDateString()
	createdAt: Date;

	@ApiProperty()
	@IsNotEmpty()
	@IsEnum(Status)
	status: Status;

	@ApiProperty()
	@IsNotEmpty()
	@IsInt()
	createdBy: number;

	@ApiProperty()
	@IsNotEmpty()
	@IsInt()
	workerUserId: number;

	@ApiProperty()
	@IsNotEmpty()
	@IsInt()
	projectId: number;
}
