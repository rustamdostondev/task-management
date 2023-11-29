import { TableNames } from "../../../common/database/table_names";
import { OrganizationDto } from "../../organization/dto/organization.dto";
import { UserDto } from "../../users/dto/user.dto";
import { OrganizationUserEntity } from "../entities/organization_user.entity";

export class OrganizationUserDto {
	id: number;
	orgId: number;
	userId: number;
	[TableNames.ORGANIZATION]?: OrganizationDto;
	[TableNames.USERS]?: UserDto;

	constructor(entity: OrganizationUserEntity) {
		this.id = entity.id;
		this.orgId = entity.org_id;
		this.userId = entity.user_id;
		this[TableNames.ORGANIZATION] = new OrganizationDto(
			entity[TableNames.ORGANIZATION],
		);
		this[TableNames.USERS] = new UserDto(entity[TableNames.USERS]);
	}
}
