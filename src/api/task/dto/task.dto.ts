import { Status } from "../../../common/status.enum";
import { TaskEntity } from "../entities/task.entity";

export class TaskDto {
	id: number;
	name: string;
	dueDate: Date;
	doneAt: Date;
	createdAt: Date;
	status: Status;
	createdBy: number;
	workerUserId: number;
	projectId: number;

	constructor(entity: TaskEntity) {
		this.id = entity.id;
		this.name = entity.name;
		this.dueDate = entity.due_date;
		this.doneAt = entity.done_at;
		this.createdAt = entity.created_at;
		this.status = entity.status;
		this.createdBy = entity.created_by;
		this.workerUserId = entity.worker_user_id;
		this.projectId = entity.project_id;
	}
}
