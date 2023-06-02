import { Injectable } from "@nestjs/common";
import { PageResObj } from "src/api/response/page-res-obj";
import axios from "axios";

@Injectable()
export class IndexService {
	async krxDdTrd() {
		try {
			const url = "http://data-dbg.krx.co.kr/svc/apis/sto/stk_bydd_trd?basDd=20230414";

			const response = await axios.get(url, {
				responseType: "json",
				headers: {
					AUTH_KEY: process.env.API_KEY,
				},
			});

			return new PageResObj(response.data, "KRX 시리즈 일별시세정보 조회에 성공하였습니다.");
		} catch (error) {
			return new PageResObj({}, error.message, true);
		}
	}

	async kospiDdTrd() {
		try {
			const url = "http://data-dbg.krx.co.kr/svc/apis/sto/stk_bydd_trd?basDd=20230414";

			const response = await axios.get(url, {
				responseType: "json",
				headers: {
					AUTH_KEY: process.env.API_KEY,
				},
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

			// // 삭제(soft-delete)
			// post.isDeleted = true;
			// await this.postRepository.save(post);
		} catch (error) {
			return new PageResObj({}, error.message, true);
		}
	}
}
