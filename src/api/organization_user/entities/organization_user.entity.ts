import { TableNames } from "../../../common/database/table_names";
import { PartiallyOptional } from "../../../common/type";
import { OrganizationEntity } from "../../organization/entities/organization.entity";
import { UserEntity } from "../../users/entities/user.entity";
import { OrganizationUserDto } from "../dto/organization_user.dto";

export class OrganizationUserEntity {
	id: number;
	org_id: number;
	user_id: number;
	[TableNames.ORGANIZATION]?: OrganizationEntity;
	[TableNames.USERS]?: UserEntity;

	constructor(dto: PartiallyOptional<OrganizationUserDto, "id">) {
		this.id = dto.id;
		this.org_id = dto.orgId;
		this.user_id = dto.userId;
		this[TableNames.ORGANIZATION] = new OrganizationEntity(
			dto[TableNames.ORGANIZATION],
		);
		this[TableNames.USERS] = new UserEntity(dto[TableNames.USERS]);
	}
}
