import { Module } from "@nestjs/common";
import { PostController } from "./post.controller";
import { PostService } from "./post.service";
import { UserRepository } from "src/user/user.repository";
import { PostRepository } from "./post.repository";
import { TypeOrmExModule } from "src/util/typeorm-ex.module";
import { AuthModule } from "src/auth/auth.module";

@Module({
	imports: [TypeOrmExModule.forCustomRepository([PostRepository, UserRepository]), AuthModule],
	controllers: [PostController],
	providers: [PostService],
})
export class PostModule {}
