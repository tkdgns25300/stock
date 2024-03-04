import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { SpaceRoleType } from "../enum/space-role-type.enum";
import { ApiProperty } from "@nestjs/swagger";

export class CreateSpaceRoleDto {
	@IsString()
	@IsNotEmpty()
	@ApiProperty()
	roleName: string;

	@IsNotEmpty()
	@ApiProperty({ enum: ["관리자", "참여자"] })
	roleType: SpaceRoleType;
}
