import { PartiallyOptional } from "../../../common/type";
import { UserDto } from "../dto/user.dto";

export class UserEntity {
	id: number;
	name: string;
	role_id: number;
	created_by: number;

	constructor(dto: PartiallyOptional<UserDto, "id">) {
		this.id = dto.id;
		this.name = dto.name;
		this.role_id = dto.roleId;
		this.created_by = dto.createdBy;
	}
}
