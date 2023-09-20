import { Module } from "@nestjs/common";
import { CompanyModule } from "./modules/company/company.module";
import { UtilsModule } from "./modules/utils/utils.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { typeOrmModuleOptions } from "./db/configs/typeorm.config";
import { DataSource } from "typeorm";
import { NewsModule } from './news/news.module';

@Module({
	imports: [TypeOrmModule.forRoot(typeOrmModuleOptions), CompanyModule, UtilsModule, NewsModule],
	controllers: [],
	providers: [],
})
export class AppModule {
	constructor(private dataSource: DataSource) {}
}
