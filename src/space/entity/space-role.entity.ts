// space-role.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn, OneToMany } from "typeorm";
import { Space } from "./space.entity";
import { SpaceRoleType } from "../enum/space-role-type.enum";
import { SpaceMember } from "./space-member.entity";

@Entity()
export class SpaceRole {
	@PrimaryGeneratedColumn({
		comment: "공간 역할 아이디",
	})
	id: number;

	@Column({
		comment: "공간에서 사용할 역할명",
		type: "varchar",
	})
	name: string;

	@Column({
		type: "enum",
		enum: SpaceRoleType,
		comment: "공간 내 역할",
	})
	roleType: SpaceRoleType;

	@Column({
		comment: "삭제 여부",
		type: "boolean",
		default: false,
	})
	isDeleted: boolean;

	@ManyToOne(() => Space, (space) => space.roles)
	space: Space;
}
