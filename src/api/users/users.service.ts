import { Injectable } from "@nestjs/common";
import { Knex } from "knex";
import { InjectConnection } from "nest-knexjs";

import { BaseService } from "../../common/base.service";
import { TableNames } from "../../common/database/table_names";

import { UserDto } from "./dto/user.dto";
import { UserEntity } from "./entities/user.entity";

@Injectable()
export class UsersService extends BaseService<UserEntity> {
	constructor(@InjectConnection() knex: Knex<UserEntity, UserEntity[]>) {
		super(knex, TableNames.USERS, UserDto);
	}
}
