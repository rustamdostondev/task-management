import { ProjectEntity } from "../entities/project.entity";

export class ProjectDto {
	id: number;
	name: string;
	orgId: number;
	createdBy: number;

	constructor(entity: ProjectEntity) {
		this.id = entity.id;
		this.name = entity.name;
		this.orgId = entity.org_id;
		this.createdBy = entity.created_by;
	}
}
