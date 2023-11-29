import * as path from "path";

import { Module } from "@nestjs/common";
import { KnexModule } from "nest-knexjs";

import { getDatabaseConfig } from "../config/database";

import { OrganizationModule } from "./organization/organization.module";
import { OrganizationUserModule } from "./organization_user/organization_user.module";
import { ProjectModule } from "./project/project.module";
import { RoleModule } from "./role/role.module";
import { TaskModule } from "./task/task.module";
import { UsersModule } from "./users/users.module";

@Module({
	imports: [
		KnexModule.forRoot(
			getDatabaseConfig(
				path.join(__dirname, "..", "..", "..", "config.json"),
			),
		),
		UsersModule,
		RoleModule,
		OrganizationModule,
		OrganizationUserModule,
		ProjectModule,
		TaskModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
