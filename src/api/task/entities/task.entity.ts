import { Status } from "common/status.enum";

import { PartiallyOptional } from "../../../common/type";
import { TaskDto } from "../dto/task.dto";

export class TaskEntity {
	id: number;
	name: string;
	due_date: Date;
	done_at: Date;
	created_at: Date;
	status: Status;
	created_by: number;
	worker_user_id: number;
	project_id: number;

	constructor(dto: PartiallyOptional<TaskDto, "id">) {
		this.id = dto.id;
		this.name = dto.name;
		this.due_date = dto.dueDate;
		this.done_at = dto.doneAt;
		this.created_at = dto.createdAt;
		this.status = dto.status;
		this.created_by = dto.createdBy;
		this.worker_user_id = dto.workerUserId;
		this.project_id = dto.projectId;
	}
}
