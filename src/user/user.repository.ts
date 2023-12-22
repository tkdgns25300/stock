import { QueryFailedError, Repository } from "typeorm";
import { User } from "./entity/user.entity";
import { CustomRepository } from "src/util/typeorm-ex.decorator";
import { CreateUserDto } from "./dto/create-user.dto";
import * as bcrypt from "bcryptjs";
import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { PageResObj } from "src/api/response/page-res-obj";

@CustomRepository(User)
export class UserRepository extends Repository<User> {}
