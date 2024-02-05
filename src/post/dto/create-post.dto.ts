import { IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString, isString } from "class-validator";
import { PostType } from "../enum/post-type.enum";

export class CreatePostDto {
	@IsString()
	@IsNotEmpty()
	title: string;

	@IsString()
	@IsNotEmpty()
	content: string;

	@IsString()
	@IsOptional()
	attachment: string;

	@IsEnum(PostType)
	@IsNotEmpty()
	type: PostType;

	@IsBoolean()
	@IsOptional()
	isAnonymous: boolean;
}
