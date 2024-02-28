import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { SpaceMember } from "./space-member.entity";
import { Post } from "src/post/entity/post.entity";
import { SpaceRole } from "./space-role.entity";

@Entity()
export class Space {
	@PrimaryGeneratedColumn({
		comment: "공간 아이디",
	})
	id: number;

	@Column({
		comment: "공간 이름",
		type: "varchar",
	})
	name: string;

	@Column({
		comment: "공간 로고",
		type: "varchar",
	})
	logo: string;

	@Column({
		comment: "공간 소유자(이메일)",
		type: "varchar",
	})
	owner: string;

	@Column({
		comment: "관리자용 입장코드",
		type: "varchar",
		length: 8,
	})
	adminCode: string;

	@Column({
		comment: "참여자용 입장코드",
		type: "varchar",
		length: 8,
	})
	participantsCode: string;

	@Column({
		comment: "삭제 여부",
		type: "boolean",
		default: false,
	})
	isDeleted: boolean;

	@OneToMany(() => SpaceRole, (role) => role.space)
	roles: SpaceRole[];

	@OneToMany(() => SpaceMember, (membership) => membership.space)
	spaceMembers: SpaceMember[];

	@OneToMany(() => Post, (post) => post.space)
	posts: Post[];
}
