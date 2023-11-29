import { UserEntity } from "../entities/user.entity";

export class UserDto {
	id: number;
	name: string;
	roleId: number;
	createdBy: number;

	constructor(entity: UserEntity) {
		this.id = entity.id;
		this.name = entity.name;
		this.roleId = entity.role_id;
		this.createdBy = entity.created_by;
	}
}
