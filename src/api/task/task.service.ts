import { Injectable } from "@nestjs/common";
import { Knex } from "knex";
import { InjectConnection } from "nest-knexjs";

import { BaseService } from "../../common/base.service";
import { TableNames } from "../../common/database/table_names";

import { TaskDto } from "./dto/task.dto";
import { TaskEntity } from "./entities/task.entity";

@Injectable()
export class TaskService extends BaseService<TaskEntity> {
	constructor(@InjectConnection() knex: Knex) {
		super(knex, TableNames.TASK, TaskDto);
	}
}
