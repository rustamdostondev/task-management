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

import { CreateOrganizationUserDto } from "./dto/create-organization_user.dto";
import { UpdateOrganizationUserDto } from "./dto/update-organization_user.dto";
import { OrganizationUserEntity } from "./entities/organization_user.entity";
import { OrganizationUserService } from "./organization_user.service";

@Controller("organization-user")
export class OrganizationUserController {
	private readonly logger = new Logger(OrganizationUserController.name);
	constructor(
		private readonly organizationUserService: OrganizationUserService,
	) {}

	@Post()
	create(@Body() dto: CreateOrganizationUserDto) {
		try {
			return this.organizationUserService.create(
				new OrganizationUserEntity(dto),
			);
		} catch (error) {
			this.logger.error(error);
		}
	}

	@Get()
	readAll() {
		try {
			return this.organizationUserService.readAll();
		} catch (error) {
			this.logger.error(error);
		}
	}

	@Get(":id")
	readOne(@Param("id") id: string) {
		try {
			return this.organizationUserService.readOne(id);
		} catch (error) {
			this.logger.error(error);
		}
	}

	@Put(":id")
	update(@Param("id") id: string, @Body() dto: UpdateOrganizationUserDto) {
		try {
			return this.organizationUserService.update(
				id,
				new OrganizationUserEntity(dto),
			);
		} catch (error) {
			this.logger.error(error);
		}
	}

	@Delete(":id")
	delete(@Param("id") id: string) {
		try {
			return this.organizationUserService.delete(id);
		} catch (error) {
			this.logger.error(error);
		}
	}
}
