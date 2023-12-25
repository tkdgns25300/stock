import { QueryFailedError, Repository } from "typeorm";
import { User } from "./entity/user.entity";
import { CustomRepository } from "src/util/typeorm-ex.decorator";
import { CreateUserDto } from "./dto/create-user.dto";
import * as bcrypt from "bcryptjs";
import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { PageResObj } from "src/api/response/page-res-obj";

@CustomRepository(User)
export class UserRepository extends Repository<User> {
	async createUser(createUserDto: CreateUserDto): Promise<PageResObj<{}>> {
		const { email, password, firstName, lastName, profilePicture } = createUserDto;

		const salt = await bcrypt.genSalt();
		const hashedPassword = await bcrypt.hash(password, salt);

		const user = this.create({ email, password: hashedPassword, firstName, lastName, profilePicture });
	}
}
