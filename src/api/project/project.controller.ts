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

import { CreateProjectDto } from "./dto/create-project.dto";
import { UpdateProjectDto } from "./dto/update-project.dto";
import { ProjectEntity } from "./entities/project.entity";
import { ProjectService } from "./project.service";

@Controller("project")
export class ProjectController {
	private readonly logger = new Logger(ProjectController.name);
	constructor(private readonly projectService: ProjectService) {}

	@Post()
	create(@Body() dto: CreateProjectDto) {
		try {
			return this.projectService.create(new ProjectEntity(dto));
		} catch (error) {
			this.logger.error(error);
		}
	}

	@Get()
	readAll() {
		try {
			return this.projectService.readAll();
		} catch (error) {
			this.logger.error(error);
		}
	}

	@Get(":id")
	readOne(@Param("id") id: string) {
		try {
			return this.projectService.readOne(id);
		} catch (error) {
			this.logger.error(error);
		}
	}

	@Put(":id")
	update(@Param("id") id: string, @Body() dto: UpdateProjectDto) {
		try {
			return this.projectService.update(id, new ProjectEntity(dto));
		} catch (error) {
			this.logger.error(error);
		}
	}

	@Delete(":id")
	delete(@Param("id") id: string) {
		try {
			return this.projectService.delete(id);
		} catch (error) {
			this.logger.error(error);
		}
	}
}
