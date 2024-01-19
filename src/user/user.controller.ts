import { Body, Controller, Get, Patch, UsePipes, ValidationPipe } from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "./entity/user.entity";
import { GetUser } from "./get-user.decorator";
import { PageResObj } from "src/api/response/page-res-obj";
import { UpdateUserDto } from "./dto/update-user.dto";

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

	// 자기 프로필 수정 (ID, 이메일 X)
	@Patch("/update")
	@UsePipes(ValidationPipe)
	updateMyProfile(
		@Body() updateUserDto: UpdateUserDto,
		@GetUser() user: User,
	): Promise<PageResObj<User> | PageResObj<{}>> {
		return this.userService.updateMyProfile(updateUserDto, user);
	}
}
