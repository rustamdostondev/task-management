import { Knex } from "knex";

import { TableNames } from "../common/database/table_names";

export async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable(TableNames.ROLE, (table) => {
		table.increments("id", { primaryKey: true });
		table.string("name", 255).notNullable();
	});

	await knex(TableNames.ROLE).insert({ id: 1, name: "--" });

	await knex.schema.createTable(TableNames.USERS, (table) => {
		table.increments("id", { primaryKey: true });
		table.string("name", 255).notNullable();
		table.integer("role_id").nullable();
		table
			.foreign("role_id")
			.references("role.id")
			.withKeyName("fk_role_id");
	});

	await knex(TableNames.USERS).insert({ name: "--", role_id: 1 });

	await knex.schema.alterTable(TableNames.USERS, (table) => {
		table.integer("created_by").nullable();
		table
			.foreign("created_by")
			.references("users.id")
			.withKeyName("fk_user_id");
	});

	await knex(TableNames.USERS).update({ created_by: 1 });

	await knex.schema.alterTable(TableNames.ROLE, (table) => {
		table.integer("created_by").nullable();
		table
			.foreign("created_by")
			.references("users.id")
			.withKeyName("fk_user_id");
	});

	await knex(TableNames.ROLE).update({ created_by: 1 });

	await knex.schema.createTable(TableNames.ORGANIZATION, (table) => {
		table.increments("id", { primaryKey: true });
		table.string("name", 255).notNullable();
		table.integer("created_by").nullable();
		table
			.foreign("created_by")
			.references("users.id")
			.withKeyName("fk_user_id");
	});

	await knex(TableNames.ORGANIZATION).insert({ name: "--", created_by: 1 });

	await knex.schema.createTable(TableNames.ORGANIZATION_USER, (table) => {
		table.increments("id", { primaryKey: true });
		table.integer("org_id").nullable();
		table.integer("user_id").nullable();
		table
			.foreign("org_id")
			.references("organization.id")
			.withKeyName("fk_organization_id");
		table
			.foreign("user_id")
			.references("users.id")
			.withKeyName("fk_user_id");
	});

	await knex.schema.createTable(TableNames.PROJECT, (table) => {
		table.increments("id", { primaryKey: true });
		table.string("name", 255).notNullable();
		table.integer("org_id").nullable();
		table.integer("created_by").nullable();
		table
			.foreign("org_id")
			.references("organization.id")
			.withKeyName("fk_organization_id");
		table
			.foreign("created_by")
			.references("users.id")
			.withKeyName("fk_user_id");
	});

	await knex.schema.createTable(TableNames.TASK, (table) => {
		table.increments("id", { primaryKey: true });
		table.string("name", 255).notNullable();
		table.timestamp("due_date");
		table.timestamp("done_at");
		table.timestamp("created_at");
		table.integer("status");
		table.integer("created_by").nullable();
		table.integer("worker_user_id").nullable();
		table.integer("project_id").nullable();
		table
			.foreign("created_by")
			.references("users.id")
			.withKeyName("fk_user_id");
		table
			.foreign("worker_user_id")
			.references("users.id")
			.withKeyName("fk_worker_user_id");
		table
			.foreign("project_id")
			.references("project.id")
			.withKeyName("fk_project_id");
	});
}

export async function down(knex: Knex): Promise<void> {
	await knex.raw(`DROP TABLE ${TableNames.ROLE} CASCADE`);
	await knex.raw(`DROP TABLE ${TableNames.USERS} CASCADE`);
	await knex.raw(`DROP TABLE ${TableNames.ORGANIZATION} CASCADE`);
	await knex.raw(`DROP TABLE ${TableNames.ORGANIZATION_USER} CASCADE`);
	await knex.raw(`DROP TABLE ${TableNames.PROJECT} CASCADE`);
	await knex.raw(`DROP TABLE ${TableNames.TASK} CASCADE`);
}
