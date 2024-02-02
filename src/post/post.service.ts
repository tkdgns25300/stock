import { Injectable } from "@nestjs/common";
import { UserRepository } from "src/user/user.repository";
import { PostRepository } from "./post.repository";

@Injectable()
export class PostService {
	constructor(
		private readonly postRepository: PostRepository,
		private readonly userRepository: UserRepository,
	) {}
}
