import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column, OneToOne } from "typeorm";
import { Space } from "./space.entity";
import { User } from "src/user/entity/user.entity";
import { SpaceRole } from "./space-role.entity";
import { SpaceRoleType } from "../enum/space-role-type.enum";

// User와 Space 간 다대다 관계이기 때문에 사용하는 Bridge Table
@Entity()
export class SpaceMember {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({
		comment: "공간에서 사용할 역할명",
		type: "varchar",
		nullable: true,
		default: null,
	})
	memberName: string;

	@Column({
		comment: "공간 내 역할",
		type: "enum",
		enum: SpaceRoleType,
	})
	memberRoleType: SpaceRoleType;

	@ManyToOne(() => User, (user) => user.spaceMembers, { onDelete: "CASCADE" })
	@JoinColumn({ name: "userId" })
	user: User;

	@ManyToOne(() => Space, (space) => space.spaceMembers, { onDelete: "CASCADE" })
	@JoinColumn({ name: "spaceId" })
	space: Space;
}
