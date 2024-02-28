import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { User } from "src/user/entity/user.entity";
import { PostType } from "../enum/post-type.enum";
import { Space } from "src/space/entity/space.entity";

@Entity()
export class Post {
	@PrimaryGeneratedColumn({
		comment: "게시물 아이디",
	})
	id: number;

	@Column({
		comment: "게시글 제목",
		type: "varchar",
	})
	title: string;

	@Column({
		comment: "게시물 내용",
		type: "varchar",
	})
	content: string;

	@Column({
		comment: "파일 또는 이미지 링크",
		type: "varchar",
		default: null,
		nullable: true,
	})
	attachment: string;

	@Column({
		comment: "게시물 종류",
		type: "enum",
		enum: PostType,
	})
	type: PostType;

	@Column({
		comment: "게시글 작성자(이메일)",
		type: "varchar",
	})
	authorEmail: string;

	@Column({
		comment: "익명 여부",
		type: "boolean",
		default: false,
	})
	isAnonymous: boolean;

	@Column({
		comment: "삭제 여부",
		type: "boolean",
		default: false,
	})
	isDeleted: boolean;

	@ManyToOne(() => User, (author) => author.posts)
	author: User;

	@ManyToOne(() => Space, (space) => space.posts)
	space: Space;
}
