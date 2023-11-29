import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty } from "class-validator";

export class CreateOrganizationUserDto {
	@ApiProperty()
	@IsNotEmpty()
	@IsInt()
	orgId: number;

	@ApiProperty()
	@IsNotEmpty()
	@IsInt()
	userId: number;
}
