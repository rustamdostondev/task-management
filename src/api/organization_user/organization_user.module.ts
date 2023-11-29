import { Module } from "@nestjs/common";
import { OrganizationUserService } from "./organization_user.service";
import { OrganizationUserController } from "./organization_user.controller";

@Module({
	controllers: [OrganizationUserController],
	providers: [OrganizationUserService],
})
export class OrganizationUserModule {}
