import { Injectable } from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { User } from "./entity/user.entity";
import { PageResObj } from "src/api/response/page-res-obj";

@Injectable()
export class UserService {
	constructor(private readonly userRepository: UserRepository) {}

	async getAllUsers(user: User): Promise<PageResObj<User[]> | PageResObj<{}>> {
		try {
			const users: User[] = await this.userRepository.find();

			// 타 유저 이메일 필터링
			const filteredUser = users.map((u) => {
				if (u.email !== user.email) delete u.email;
				return u;
			});

			return new PageResObj(users, "Find All User Success");
		} catch (error) {
			return new PageResObj({}, error.message, true);
		}
	}

	async getMyProfile(user: User): Promise<PageResObj<User> | PageResObj<{}>> {
		try {
			return new PageResObj(user, "Find Current User Profile Success");
		} catch (error) {
			return new PageResObj({}, error.message, true);
		}
	}
}
