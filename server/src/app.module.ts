import { Module } from "@nestjs/common";
import { CompanyModule } from "./company/company.module";
import { UtilsModule } from "./utils/utils.module";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
	imports: [
		TypeOrmModule.forRoot({
			type: "mysql",
			host: "localhost",
			port: 3306,
			username: "root",
			password: "tkdgns125@",
			database: "stockpedia",
			autoLoadEntities: true,
			synchronize: true,
		}),
		CompanyModule,
		UtilsModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
