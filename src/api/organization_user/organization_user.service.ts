import { Injectable } from "@nestjs/common";
import { Knex } from "knex";
import { InjectConnection } from "nest-knexjs";

import { BaseService } from "../../common/base.service";
import { TableNames } from "../../common/database/table_names";

import { OrganizationUserDto } from "./dto/organization_user.dto";
import { OrganizationUserEntity } from "./entities/organization_user.entity";

@Injectable()
export class OrganizationUserService extends BaseService<OrganizationUserEntity> {
	constructor(@InjectConnection() knex: Knex) {
		super(knex, TableNames.ORGANIZATION_USER, OrganizationUserDto);
	}

	readAll() {
		const result = this.knex
			.select([
				`${TableNames.ORGANIZATION_USER}.*`,
				this.knex.raw(
					`JSON_BUILD_OBJECT(
						'id', ${TableNames.ORGANIZATION}.id,
						'name', ${TableNames.ORGANIZATION}.name,
						'created_by', ${TableNames.ORGANIZATION}.created_by
					) as ${TableNames.ORGANIZATION}`,
				),
				this.knex.raw(
					`JSON_BUILD_OBJECT(
						'id', ${TableNames.USERS}.id,
						'name', ${TableNames.USERS}.name,
						'role_id', ${TableNames.USERS}.role_id,
						'created_by', ${TableNames.USERS}.created_by
					) as ${TableNames.USERS}`,
				),
			])
			.from(TableNames.ORGANIZATION_USER)
			.leftJoin(TableNames.ORGANIZATION, (join) => {
				join.on(
					`${TableNames.ORGANIZATION_USER}.org_id`,
					`${TableNames.ORGANIZATION}.id`,
				);
			})
			.leftJoin(TableNames.USERS, (join) => {
				join.on(
					`${TableNames.ORGANIZATION_USER}.user_id`,
					`${TableNames.USERS}.id`,
				);
			});

		return result.then((e) => {
			return e.map(
				(o) =>
					new OrganizationUserDto(
						o as unknown as OrganizationUserEntity,
					),
			);
		});
	}

	readOne(id: string) {
		const result = this.knex
			.select([
				`${TableNames.ORGANIZATION_USER}.*`,
				this.knex.raw(
					`JSON_BUILD_OBJECT(
						'id', ${TableNames.ORGANIZATION}.id,
						'name', ${TableNames.ORGANIZATION}.name,
						'created_by', ${TableNames.ORGANIZATION}.created_by
					) as ${TableNames.ORGANIZATION}`,
				),
				this.knex.raw(
					`JSON_BUILD_OBJECT(
						'id', ${TableNames.USERS}.id,
						'name', ${TableNames.USERS}.name,
						'role_id', ${TableNames.USERS}.role_id,
						'created_by', ${TableNames.USERS}.created_by
					) as ${TableNames.USERS}`,
				),
			])
			.from(TableNames.ORGANIZATION_USER)
			.leftJoin(TableNames.ORGANIZATION, (join) => {
				join.on(
					`${TableNames.ORGANIZATION_USER}.org_id`,
					`${TableNames.ORGANIZATION}.id`,
				);
			})
			.leftJoin(TableNames.USERS, (join) => {
				join.on(
					`${TableNames.ORGANIZATION_USER}.user_id`,
					`${TableNames.USERS}.id`,
				);
			})
			.where(`${TableNames.ORGANIZATION_USER}.id`, Number(id));

		return result.then((e) => {
			return e.map(
				(o) =>
					new OrganizationUserDto(
						o as unknown as OrganizationUserEntity,
					),
			);
		});
	}
}
