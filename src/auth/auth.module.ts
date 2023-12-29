import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { TypeOrmExModule } from "src/util/typeorm-ex.module";
import { UserRepository } from "src/user/user.repository";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./jwt.strategy";
import * as dotenv from "dotenv";

// NODE_ENV 값에 따라 다른 .env 파일을 로드
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

@Module({
	imports: [
		TypeOrmExModule.forCustomRepository([UserRepository]),
		PassportModule.register({ defaultStrategy: "jwt" }),
		JwtModule.register({
			secret: process.env.JWT_SECRET_KEY,
		}),
	],
	controllers: [AuthController],
	providers: [AuthService, JwtStrategy],
	exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
