import { Injectable } from "@nestjs/common";
import { PageResObj } from "src/api/response/page-res-obj";
import axios from "axios";

@Injectable()
export class StockService {
	async stkByddTrd() {
		try {
			const url = "http://data-dbg.krx.co.kr/svc/apis/sto/stk_bydd_trd?basDd=20230414";

			const response = await axios.get(url, {
				responseType: "json",
				headers: {
					AUTH_KEY: process.env.API_KEY,
				},
			});

			return new PageResObj(response.data, "유가증권 일별매매정보 조회에 성공하였습니다.");
		} catch (error) {
			return new PageResObj({}, error.message, true);
		}
	}

	async ksqByddTrd() {
		try {
			const url = "http://data-dbg.krx.co.kr/svc/apis/sto/ksq_bydd_trd?basDd=20230414";
			const response = await axios.get(url, {
				responseType: "json", // json 형식으로 반환
				headers: {
					AUTH_KEY: process.env.API_KEY,
				},
			});

			return new PageResObj(response.data, "코스닥 일별매매정보 조회에 성공하였습니다.");
		} catch (error) {
			return new PageResObj({}, error.message, true);
		}
	}

	async knxByddTrd() {
		const url = "http://data-dbg.krx.co.kr/svc/apis/sto/ksq_bydd_trd?basDd=20230414";
		const response = await axios.get(url, {
			responseType: "json", // json 형식으로 반환
			headers: {
				AUTH_KEY: process.env.API_KEY,
			},
		});
		try {
		} catch (error) {
			return new PageResObj({}, error.message, true);
		}
	}
}

// try {
//     // 존재하는 space 인지, post 인지 확인
//     const space = await this.spaceRepository.findOne({
//         where: {
//             id: spaceId,
//             isDeleted: false,
//         },
//     });
//     if (!space) {
//         return new PageResObj({}, "Invalid Space Id", true);
//     }
//     const post = await this.postRepository.findOne({
//         where: {
//             id: postId,
//             isDeleted: false,
//         },
//     });
//     if (!post) {
//         return new PageResObj({}, "Invalid Post Id", true);
//     }
//     /**
//      * 유저의 권한 확인
//      * 관리자인가 소유자인가
//      */
//     let isOwner: boolean;
//     let isAdmin: boolean = false;

//     const spaceMember = await this.spaceMemberRepository.findOne({
//         where: {
//             space: { id: spaceId },
//             user: { id: user.id },
//         },
//     });
//     // 참여자가 아닐 경우
//     if (!spaceMember) {
//         return new PageResObj({}, "Not Participant", true);
//     }

//     const currentUserAuth: SpaceRoleType = spaceMember.memberRoleType;
//     if (currentUserAuth === SpaceRoleType.ADMIN) isAdmin = true;
//     if (post.authorEmail === user.email) isOwner = true;

//     if (!isAdmin && !isOwner) {
//         return new PageResObj({}, "Not Authorized: Neither Admin Nor Owner", true);
//     }

//     // 삭제(soft-delete)
//     post.isDeleted = true;
//     await this.postRepository.save(post);

//     return new PageResObj({}, "Delete Post Success");
// } catch (error) {
//     return new PageResObj({}, error.message, true);
// }
