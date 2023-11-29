import { RoleEntity } from "../entities/role.entity";

export class RoleDto {
	id: number;
	name: string;
	createdBy: number;
	constructor(entity: RoleEntity) {
		this.id = entity.id;
		this.name = entity.name;
		this.createdBy = entity.created_by;
	}
}
