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
		} catch (error) {
			return new PageResObj({}, error.message, true);
		}
	}
}
