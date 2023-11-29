import { Knex } from "knex";

import { BaseEntity } from "./database/base.entity";

export class BaseService<Entity extends BaseEntity> {
	constructor(
		protected readonly knex: Knex<unknown, unknown[]>,
		protected readonly tablename: string,
		protected readonly Dto: new (a: object) => object,
	) {}

	create(dto: Entity) {
		const result = this.knex(this.tablename).insert(dto).returning("*");

		return result.then((entities: Entity[]) => {
			return entities.map((entity) => new this.Dto(entity));
		});
	}

	readAll() {
		const result = this.knex(this.tablename)
			.select("*")
			.whereRaw("id != ??", 1);

		return result.then((entities: Entity[]) => {
			return entities.map((entity) => new this.Dto(entity));
		});
	}

	readOne(id: string) {
		const result = this.knex(this.tablename)
			.select("*")
			.whereRaw("id != ??", 1)
			.andWhereRaw("id = ??", Number(id));

		return result.then((entities: Entity[]) => {
			return entities.map((entity) => new this.Dto(entity));
		});
	}

	update(id: string, dto: Entity) {
		const result = this.knex(this.tablename)
			.where("id", id)
			.update(dto)
			.returning("*");

		return result.then((entities: Entity[]) => {
			return entities.map((entity) => new this.Dto(entity));
		});
	}

	delete(id: string) {
		const result = this.knex(this.tablename)
			.delete()
			.where("id", Number(id))
			.returning("*");

		return result.then((entities: Entity[]) => {
			return entities.map((entity) => new this.Dto(entity));
		});
	}
}
