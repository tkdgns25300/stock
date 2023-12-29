import { Body, Controller, Post, ValidationPipe } from "@nestjs/common";
import { PageResObj } from "src/api/response/page-res-obj";
import { CreateUserDto } from "src/user/dto/create-user.dto";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post("/signup")
	signUp(@Body(ValidationPipe) createUserDto: CreateUserDto): Promise<PageResObj<{}>> {
		return this.authService.signUp(createUserDto);
	}
}
