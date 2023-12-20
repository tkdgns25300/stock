import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
	@PrimaryGeneratedColumn({
		comment: "유저 아이디",
	})
	id: number;

	@Column({
		comment: "이메일",
		type: "varchar",
		length: 255,
		unique: true,
	})
	email: string;

	@Column({
		comment: "패스워드(암호화)",
		type: "varchar",
	})
	password: string;

	@Column({
		comment: "이름",
		type: "varchar",
	})
	firstName: string;

	@Column({
		comment: "성",
		type: "varchar",
	})
	lastName: string;

	@Column({
		comment: "프로필 사진",
		type: "varchar",
	})
	profilePicture: string;
}
