import { Controller, Get } from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "./entity/user.entity";
import { GetUser } from "./get-user.decorator";
import { PageResObj } from "src/api/response/page-res-obj";

@Controller("user")
export class UserController {
	constructor(private userService: UserService) {}

	// 모든 유저 프로필 조회(자기거는 이메일 O, 다른 사람거는 이메일 X))
	@Get("/find")
	getAllUsers(@GetUser() user: User): Promise<PageResObj<User[]> | PageResObj<{}>> {
		return this.userService.getAllUsers(user);
	}

	// 자기 프로필 조회
	@Get("/mine")
	getMyProfile(@GetUser() user: User): Promise<PageResObj<User> | PageResObj<{}>> {
		return this.userService.getMyProfile(user);
	}
}
