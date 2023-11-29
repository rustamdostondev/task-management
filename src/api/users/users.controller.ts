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

import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserEntity } from "./entities/user.entity";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
	private readonly logger = new Logger(UsersController.name);
	constructor(private readonly usersService: UsersService) {}

	@Post()
	create(@Body() dto: CreateUserDto) {
		try {
			return this.usersService.create(new UserEntity(dto));
		} catch (error) {
			this.logger.error(error);
		}
	}

	@Get()
	findAll() {
		try {
			return this.usersService.readAll();
		} catch (error) {
			this.logger.error(error);
		}
	}

	@Get(":id")
	findOne(@Param("id") id: string) {
		try {
			return this.usersService.readOne(id);
		} catch (error) {
			this.logger.error(error);
		}
	}

	@Put(":id")
	update(@Param("id") id: string, @Body() dto: UpdateUserDto) {
		try {
			return this.usersService.update(id, new UserEntity(dto));
		} catch (error) {
			this.logger.error(error);
		}
	}

	@Delete(":id")
	remove(@Param("id") id: string) {
		try {
			return this.usersService.delete(id);
		} catch (error) {
			this.logger.error(error);
		}
	}
}
