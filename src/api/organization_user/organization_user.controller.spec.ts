import { Test, TestingModule } from "@nestjs/testing";
import { OrganizationUserController } from "./organization_user.controller";
import { OrganizationUserService } from "./organization_user.service";

describe("OrganizationUserController", () => {
	let controller: OrganizationUserController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [OrganizationUserController],
			providers: [OrganizationUserService],
		}).compile();

		controller = module.get<OrganizationUserController>(
			OrganizationUserController,
		);
	});

	it("should be defined", () => {
		expect(controller).toBeDefined();
	});
});
