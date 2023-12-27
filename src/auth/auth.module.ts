import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { TypeOrmExModule } from "src/util/typeorm-ex.module";
import { UserRepository } from "src/user/user.repository";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";

@Module({
	imports: [
		TypeOrmExModule.forCustomRepository([UserRepository]),
		PassportModule.register({ defaultStrategy: "jwt" }),
		JwtModule.register({
			secret: process.env.JWT_SECRET_KEY,
		}),
	],
	controllers: [AuthController],
	providers: [AuthService],
})
export class AuthModule {}
