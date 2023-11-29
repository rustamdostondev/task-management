import { PartiallyOptional } from "../../../common/type";
import { OrganizationDto } from "../dto/organization.dto";

export class OrganizationEntity {
	id: number;
	name: string;
	created_by: number;

	constructor(dto: PartiallyOptional<OrganizationDto, "id">) {
		this.id = dto.id;
		this.name = dto.name;
		this.created_by = dto.createdBy;
	}
}
