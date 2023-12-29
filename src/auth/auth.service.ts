import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { PageResObj } from "src/api/response/page-res-obj";
import { CreateUserDto } from "src/user/dto/create-user.dto";
import { UserRepository } from "src/user/user.repository";

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
}
