import { Injectable } from "@nestjs/common";
import { Knex } from "knex";
import { InjectConnection } from "nest-knexjs";

import { BaseService } from "common/base.service";

import { TableNames } from "../../common/database/table_names";

import { RoleDto } from "./dto/role.dto";
import { RoleEntity } from "./entities/role.entity";

@Injectable()
export class RoleService extends BaseService<RoleEntity> {
	constructor(@InjectConnection() knex: Knex<RoleEntity, RoleEntity[]>) {
		super(knex, TableNames.ROLE, RoleDto);
	}
}
