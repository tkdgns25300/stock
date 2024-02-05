import { Body, Controller, Param, ParseIntPipe, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { PostService } from "./post.service";
import { GetUser } from "src/user/get-user.decorator";
import { User } from "src/user/entity/user.entity";
import { PageResObj } from "src/api/response/page-res-obj";
import { CreatePostDto } from "./dto/create-post.dto";
import { Post as PostEntity } from "./entity/post.entity";

@Controller("post")
export class PostController {
	constructor(private postService: PostService) {}

	// 게시글 생성
	@Post("/:spaceId")
	@UsePipes(ValidationPipe)
	createPost(
		@GetUser() user: User,
		@Param("spaceId", ParseIntPipe) spaceId: number,
		@Body() createPostDto: CreatePostDto,
	): Promise<PageResObj<PostEntity> | PageResObj<{}>> {
		return this.postService.createPost(user, spaceId, createPostDto);
	}
}
