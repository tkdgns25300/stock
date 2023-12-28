import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import * as config from "config";
import { User } from "src/user/entity/user.entity";
import { UserRepository } from "src/user/user.repository";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(
		@InjectRepository(UserRepository)
		private userRepository: UserRepository,
	) {
		super({
			secretOrKey: process.env.JWT_SECRET_KEY,
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
		});
	}

	async validate(payload): Promise<User> {
		const { email, isAccessToken } = payload;
		if (!isAccessToken) {
			throw new UnauthorizedException();
		}
		const user: User = await this.userRepository.findOne({
			where: {
				email,
			},
		});

		if (!user) {
			throw new UnauthorizedException();
		}

		return user;
	}
}
