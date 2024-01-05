import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { PageResObj } from "src/api/response/page-res-obj";
import { CreateUserDto } from "src/user/dto/create-user.dto";
import { UserRepository } from "src/user/user.repository";
import { AuthCredentialsDto } from "./dto/auth-credential.dto";
import * as bcrypt from "bcryptjs";

@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(UserRepository)
		private userRepository: UserRepository,
		private jwtService: JwtService,
	) {}

	async signUp(createUserDto: CreateUserDto): Promise<PageResObj<{}>> {
		return this.userRepository.createUser(createUserDto);
	}

	async signIn(
		authCredentialsDto: AuthCredentialsDto,
	): Promise<PageResObj<{ accessToken: string; refreshToken: string }> | PageResObj<{}>> {
		try {
			const { email, password } = authCredentialsDto;
			const user = await this.userRepository.findOne({
				where: {
					email,
				},
			});
			if (user && (await bcrypt.compare(password, user.password))) {
				// Access Token & Refresh Token 생성
				const AccessTokenPayload = { email, isAccessToken: true };
				const RefreshTokenPayload = { email, isAccessToken: false };
				const accessToken = this.jwtService.sign(AccessTokenPayload, { expiresIn: "1h" }); // Access Token 유효시간 1시간
				const refreshToken = this.jwtService.sign(RefreshTokenPayload, { expiresIn: "30d" }); // Refresh Token 유효시간 30일

				return new PageResObj({ accessToken, refreshToken }, "Login Success");
			} else {
				return new PageResObj({}, "Login Failed", true);
			}
		} catch (error) {
			return new PageResObj({}, error.message, true);
		}
	}

	async refreshAccessToken(refreshToken: string): Promise<PageResObj<{ accessToken: string }> | PageResObj<{}>> {
		try {
		} catch (error) {
			return new PageResObj({}, error.message, true);
		}
	}
}
