import { OrganizationEntity } from "../entities/organization.entity";

export class OrganizationDto {
	id: number;
	name: string;
	createdBy: number;

	constructor(entity: OrganizationEntity) {
		this.id = entity.id;
		this.name = entity.name;
		this.createdBy = entity.created_by;
	}
}
