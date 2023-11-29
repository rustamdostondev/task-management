import { Injectable } from "@nestjs/common";
import { Knex } from "knex";
import { InjectConnection } from "nest-knexjs";

import { BaseService } from "../../common/base.service";
import { TableNames } from "../../common/database/table_names";

import { OrganizationDto } from "./dto/organization.dto";
import { OrganizationEntity } from "./entities/organization.entity";

@Injectable()
export class OrganizationService extends BaseService<OrganizationEntity> {
	constructor(@InjectConnection() knex: Knex) {
		super(knex, TableNames.ORGANIZATION, OrganizationDto);
	}

	getReportFromTasks() {
		return this.knex
			.select([
				`${TableNames.ORGANIZATION}.*`,
				this.knex
					.count(`${TableNames.TASK}.id`)
					.from(TableNames.TASK)
					.leftJoin(TableNames.PROJECT, (join) => {
						join.on(
							`${TableNames.PROJECT}.id`,
							`${TableNames.TASK}.project_id`,
						);
					})
					.whereRaw(
						`${TableNames.TASK}.worker_user_id = ${TableNames.ORGANIZATION_USER}.user_id`,
					)
					.orWhereRaw(
						`${TableNames.PROJECT}.org_id = ${TableNames.ORGANIZATION}.id`,
					)
					.as(TableNames.TASK),
				this.knex
					.count(`${TableNames.PROJECT}.id`)
					.from(TableNames.PROJECT)
					.whereRaw(
						`${TableNames.PROJECT}.org_id = ${TableNames.ORGANIZATION}.id`,
					)
					.as(TableNames.PROJECT),
			])
			.from(TableNames.ORGANIZATION)
			.leftJoin(TableNames.ORGANIZATION_USER, (join) => {
				join.on(
					`${TableNames.ORGANIZATION}.id`,
					`${TableNames.ORGANIZATION_USER}.org_id`,
				);
			});
	}

	getReportFromProject() {
		return this.knex
			.select([
				`${TableNames.ORGANIZATION}.*`,
				this.knex
					.select(
						this.knex.raw(
							`JSON_AGG(
								json_build_object(
									'id', ${TableNames.PROJECT}.id, 
									'name', ${TableNames.PROJECT}.name,
									'org_id', ${TableNames.PROJECT}.org_id,
									'created_by', ${TableNames.PROJECT}.created_by,
									'task', (select count("task".id) from "task" where project.id = task.project_id)
								)
							)`,
						),
					)
					.from(TableNames.PROJECT)
					.whereRaw(
						`${TableNames.ORGANIZATION}.id = ${TableNames.PROJECT}.org_id`,
					)
					.as(TableNames.PROJECT),
			])
			.from(TableNames.ORGANIZATION);
	}
}
