import {
	Body,
	Controller,
	Delete,
	Get,
	Logger,
	Param,
	Post,
	Put,
} from "@nestjs/common";

import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { TaskEntity } from "./entities/task.entity";
import { TaskService } from "./task.service";

@Controller("task")
export class TaskController {
	private readonly logger = new Logger(TaskController.name);
	constructor(private readonly taskService: TaskService) {}

	@Post()
	create(@Body() dto: CreateTaskDto) {
		try {
			return this.taskService.create(new TaskEntity(dto));
		} catch (error) {
			this.logger.error(error);
		}
	}

	@Get()
	findAll() {
		try {
			return this.taskService.readAll();
		} catch (error) {
			this.logger.error(error);
		}
	}

	@Get(":id")
	findOne(@Param("id") id: string) {
		try {
			return this.taskService.readOne(id);
		} catch (error) {
			this.logger.error(error);
		}
	}

	@Put(":id")
	update(@Param("id") id: string, @Body() dto: UpdateTaskDto) {
		try {
			return this.taskService.update(id, new TaskEntity(dto));
		} catch (error) {
			this.logger.error(error);
		}
	}

	@Delete(":id")
	remove(@Param("id") id: string) {
		try {
			return this.taskService.delete(id);
		} catch (error) {
			this.logger.error(error);
		}
	}
}
