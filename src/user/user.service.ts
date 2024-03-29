import { Injectable } from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { User } from "./entity/user.entity";
import { PageResObj } from "src/api/response/page-res-obj";
import { UpdateUserDto } from "./dto/update-user.dto";
import * as bcrypt from "bcryptjs";

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

	async updateMyProfile(updateUserDto: UpdateUserDto, user: User): Promise<PageResObj<User> | PageResObj<{}>> {
		try {
			let { password, firstName, lastName, profilePicture } = updateUserDto;
			if (password) {
				const salt = await bcrypt.genSalt();
				password = await bcrypt.hash(password, salt);
			}
			await this.userRepository.update(user.id, { password, firstName, lastName, profilePicture });
			const updatedUser = this.userRepository.findOne({
				where: {
					id: user.id,
				},
			});
			return new PageResObj(updatedUser, "Update User Profile Success");
		} catch (error) {
			return new PageResObj({}, error.message, true);
		}
	}
}
