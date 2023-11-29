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

import { CreateRoleDto } from "./dto/create-role.dto";
import { UpdateRoleDto } from "./dto/update-role.dto";
import { RoleEntity } from "./entities/role.entity";
import { RoleService } from "./role.service";

@Controller("role")
export class RoleController {
	private readonly logger = new Logger(RoleController.name);
	constructor(private readonly roleService: RoleService) {}

	@Get()
	readAll() {
		try {
			return this.roleService.readAll();
		} catch (error) {
			this.logger.error(error);
		}
	}

	@Get(":id")
	readOne(@Param("id") id: string) {
		try {
			return this.roleService.readOne(id);
		} catch (error) {
			this.logger.error(error);
		}
	}

	@Post()
	create(@Body() dto: CreateRoleDto) {
		try {
			return this.roleService.create(new RoleEntity(dto));
		} catch (error) {
			this.logger.error(error);
		}
	}

	@Put(":id")
	update(@Param("id") id: string, @Body() dto: UpdateRoleDto) {
		try {
			return this.roleService.update(id, new RoleEntity(dto));
		} catch (error) {
			this.logger.error(error);
		}
	}

	@Delete(":id")
	delete(@Param("id") id: string) {
		try {
			return this.roleService.delete(id);
		} catch (error) {
			this.logger.error(error);
		}
	}
}
