import { PartiallyOptional } from "../../../common/type";
import { ProjectDto } from "../dto/project.dto";

export class ProjectEntity {
	id: number;
	name: string;
	org_id: number;
	created_by: number;

	constructor(dto: PartiallyOptional<ProjectDto, "id">) {
		this.id = dto.id;
		this.name = dto.name;
		this.org_id = dto.orgId;
		this.created_by = dto.createdBy;
	}
}
