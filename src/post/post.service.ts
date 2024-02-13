import { Injectable } from "@nestjs/common";
import { UserRepository } from "src/user/user.repository";
import { PostRepository } from "./post.repository";
import { Post } from "./entity/post.entity";
import { PageResObj } from "src/api/response/page-res-obj";
import { CreatePostDto } from "./dto/create-post.dto";
import { User } from "src/user/entity/user.entity";

@Injectable()
export class PostService {
	constructor(
		private readonly postRepository: PostRepository,
		private readonly userRepository: UserRepository,
	) {}

	async createPost(
		user: User,
		spaceId: number,
		createPostDto: CreatePostDto,
	): Promise<PageResObj<Post> | PageResObj<{}>> {
		try {
			// 존재하는 space인지 확인
			const space = await this.spaceRepository.findOne({
				where: {
					id: spaceId,
				},
			});
			if (!space) {
				return new PageResObj({}, "Invalid Space Id", true);
			}

			/**
			 * 게시글 생성
			 * - 현재 유저의 권한먼저 확인(관리자 or 참여자)
			 * 익명(isAnonymous)은 질문 게시글이어야하고 참여자만 가능
			 * 관리자 : 공지/질문 가능 && 참여자 : 질문만 가능
			 */
			const spaceMember = await this.spaceMemberRepository.findOne({
				where: {
					space: { id: spaceId },
					user: { id: user.id },
				},
			});

			// 참여자가 아닐 경우
			if (!spaceMember) {
				return new PageResObj({}, "Not Participant", true);
			}
			const currentUserAuth: SpaceRoleType = spaceMember.memberRoleType;

			// 익명(isAnonymous)은 질문 게시글이어야하고 참여자만 가능

			if (
				createPostDto.isAnonymous === true &&
				(currentUserAuth === SpaceRoleType.ADMIN ||
					createPostDto.type === PostType.NOTIFICATION)
			) {
				return new PageResObj(
					{},
					"Anonymous only Possible When PARTICIPANT and QUESTION",
					true,
				);
			}

			if (
				currentUserAuth === SpaceRoleType.PARTICIPANT &&
				createPostDto.type === PostType.NOTIFICATION
			) {
				return new PageResObj({}, "Notification only Possible When ADMIN", true);
			}

			const { title, content, type, attachment, isAnonymous } = createPostDto;
			const newPost = this.postRepository.create({
				title,
				content,
				type,
				attachment,
				authorEmail: user.email,
				isAnonymous,
				author: user,
				space: space,
			});
			const savedPost = await this.postRepository.save(newPost);

			return new PageResObj(newPost, "Create New Post Success");
		} catch (error) {
			return new PageResObj({}, error.message, true);
		}
	}
}
