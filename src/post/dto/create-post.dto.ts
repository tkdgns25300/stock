import { IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString, isString } from "class-validator";
import { PostType } from "../enum/post-type.enum";
import { ApiProperty } from "@nestjs/swagger";

export class CreatePostDto {
	@IsString()
	@IsNotEmpty()
	@ApiProperty()
	title: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty()
	content: string;

	@IsString()
	@IsOptional()
	@ApiProperty()
	attachment: string;

	@IsEnum(PostType)
	@IsNotEmpty()
	@ApiProperty()
	type: PostType;

	@IsBoolean()
	@IsOptional()
	@ApiProperty()
	isAnonymous: boolean;
}
