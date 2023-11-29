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

import { CreateOrganizationDto } from "./dto/create-organization.dto";
import { UpdateOrganizationDto } from "./dto/update-organization.dto";
import { OrganizationEntity } from "./entities/organization.entity";
import { OrganizationService } from "./organization.service";

@Controller("organization")
export class OrganizationController {
	private readonly logger = new Logger(OrganizationController.name);
	constructor(private readonly organizationService: OrganizationService) {}

	@Post()
	create(@Body() dto: CreateOrganizationDto) {
		try {
			return this.organizationService.create(new OrganizationEntity(dto));
		} catch (error) {
			this.logger.error(error);
		}
	}

	@Get()
	findAll() {
		try {
			return this.organizationService.readAll();
		} catch (error) {
			this.logger.error(error);
		}
	}

	@Get("report-task")
	getReportFromTasks() {
		try {
			return this.organizationService.getReportFromTasks();
		} catch (error) {
			this.logger.error(error);
		}
	}

	@Get("report-project")
	getReportFromProject() {
		try {
			return this.organizationService.getReportFromProject();
		} catch (error) {
			this.logger.error(error);
		}
	}

	@Get(":id")
	findOne(@Param("id") id: string) {
		try {
			return this.organizationService.readOne(id);
		} catch (error) {
			this.logger.error(error);
		}
	}

	@Put(":id")
	update(@Param("id") id: string, @Body() dto: UpdateOrganizationDto) {
		try {
			return this.organizationService.update(
				id,
				new OrganizationEntity(dto),
			);
		} catch (error) {
			this.logger.error(error);
		}
	}

	@Delete(":id")
	delete(@Param("id") id: string) {
		try {
			return this.organizationService.delete(id);
		} catch (error) {
			this.logger.error(error);
		}
	}
}
