import { Body, Controller, Post, ValidationPipe } from "@nestjs/common";
import { PageResObj } from "src/api/response/page-res-obj";
import { CreateUserDto } from "src/user/dto/create-user.dto";
import { AuthService } from "./auth.service";
import { AuthCredentialsDto } from "./dto/auth-credential.dto";

@Controller("auth")
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post("/signup")
	signUp(@Body(ValidationPipe) createUserDto: CreateUserDto): Promise<PageResObj<{}>> {
		return this.authService.signUp(createUserDto);
	}

	@Post("/signin")
	signIn(
		@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
	): Promise<PageResObj<{ accessToken: string; refreshToken: string }> | PageResObj<{}>> {
		return this.authService.signIn(authCredentialsDto);
	}
}
