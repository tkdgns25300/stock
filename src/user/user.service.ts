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

			// /**
			//  * 유저의 권한 확인
			//  * 관리자인가 소유자인가
			//  */
			// let isOwner: boolean;
			// let isAdmin: boolean = false;

			// const spaceMember = await this.spaceMemberRepository.findOne({
			// 	where: {
			// 		space: { id: spaceId },
			// 		user: { id: user.id },
			// 	},
			// });
			// // 참여자가 아닐 경우
			// if (!spaceMember) {
			// 	return new PageResObj({}, "Not Participant", true);
			// }

			// const currentUserAuth: SpaceRoleType = spaceMember.memberRoleType;
			// if (currentUserAuth === SpaceRoleType.ADMIN) isAdmin = true;
			// if (post.authorEmail === user.email) isOwner = true;

			// if (!isAdmin && !isOwner) {
			// 	return new PageResObj({}, "Not Authorized: Neither Admin Nor Owner", true);
			// }
		} catch (error) {
			return new PageResObj({}, error.message, true);
		}
	}
}
