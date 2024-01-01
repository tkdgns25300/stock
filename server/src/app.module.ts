import { Module } from "@nestjs/common";
import { CompanyModule } from "./modules/company/company.module";
import { UtilsModule } from "./modules/utils/utils.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { typeOrmModuleOptions } from "./db/configs/typeorm.config";
import { DataSource } from "typeorm";
import { HealthModule } from "./modules/health/health.module";
import { RedisModule } from "@liaoliaots/nestjs-redis";
import * as dotenv from "dotenv";

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

@Module({
	imports: [
		TypeOrmModule.forRoot(typeOrmModuleOptions),
		CompanyModule,
		UtilsModule,
		HealthModule,
		RedisModule.forRoot({
			config: {
				host: process.env.REDIS_ENDPOINT,
				port: 6379,
			},
		}),
	],
	controllers: [],
	providers: [],
})
export class AppModule {
	constructor(private dataSource: DataSource) {}
}
