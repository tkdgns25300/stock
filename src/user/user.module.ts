import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { UserRepository } from "./user.repository";
import { TypeOrmExModule } from "src/util/typeorm-ex.module";
import { AuthModule } from "src/auth/auth.module";

@Module({
	imports: [TypeOrmExModule.forCustomRepository([UserRepository]), AuthModule],
	controllers: [UserController],
	providers: [UserService],
})
export class UserModule {}
