import { Injectable } from "@nestjs/common";
import { PageResObj } from "src/api/response/page-res-obj";
import axios from "axios";

@Injectable()
export class DerivativesService {
	async futByddTrd() {
		try {
			const url = "http://data-dbg.krx.co.kr/svc/apis/drv/kts_bydd_trd?basDd=20200414";

			const response = await axios.get(url, {
				responseType: "json",
				headers: {
					AUTH_KEY: process.env.API_KEY,
				},
			});

			// /**
			//  * API 요청자가 참여자일 경우 익명 게시글의 게시자(user Email) 삭제 후 리턴
			//  * - 현재 유저의 권한먼저 확인(관리자 or 참여자)
			//  */
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
			// if (currentUserAuth === SpaceRoleType.PARTICIPANT) {
			// 	for (const post of allPost) {
			// 		if (post.isAnonymous && post.authorEmail !== user.email) {
			// 			delete post.authorEmail;
			// 		}
			// 	}
			// }

			// return new PageResObj(allPost, "Get All Post Success");
		} catch (error) {
			return new PageResObj({}, error.message, true);
		}
	}
}
