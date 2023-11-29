import { BaseEntity } from "common/database/base.entity";

import { PartiallyOptional } from "../../../common/type";
import { RoleDto } from "../dto/role.dto";

export class RoleEntity implements BaseEntity {
	id: number;
	name: string;
	created_by: number;
	constructor(dto: PartiallyOptional<RoleDto, "id">) {
		this.id = dto.id;
		this.name = dto.name;
		this.created_by = dto.createdBy;
	}
}
