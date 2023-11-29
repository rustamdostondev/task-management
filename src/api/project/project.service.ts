import { Injectable } from "@nestjs/common";
import { Knex } from "knex";
import { InjectConnection } from "nest-knexjs";

import { BaseService } from "../../common/base.service";
import { TableNames } from "../../common/database/table_names";

import { ProjectDto } from "./dto/project.dto";
import { ProjectEntity } from "./entities/project.entity";

@Injectable()
export class ProjectService extends BaseService<ProjectEntity> {
	constructor(@InjectConnection() knex: Knex) {
		super(knex, TableNames.PROJECT, ProjectDto);
	}
}
