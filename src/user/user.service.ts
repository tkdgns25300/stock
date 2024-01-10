import { Injectable } from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { User } from "./entity/user.entity";
import { PageResObj } from "src/api/response/page-res-obj";

@Injectable()
export class UserService {
	constructor(private readonly userRepository: UserRepository) {}

	async getAllUsers(user: User): Promise<PageResObj<User[]> | PageResObj<{}>> {
		try {
		} catch (error) {
			return new PageResObj({}, error.message, true);
		}
	}
}
