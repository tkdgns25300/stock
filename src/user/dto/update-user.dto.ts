import { IsOptional, IsString } from "class-validator";

export class UpdateUserDto {
	@IsString()
	@IsOptional()
	password: string;

	@IsString()
	@IsOptional()
	firstName: string;

	@IsString()
	@IsOptional()
	lastName: string;

	@IsString()
	@IsOptional()
	profilePicture: string;
}
