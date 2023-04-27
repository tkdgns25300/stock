import { Module } from "@nestjs/common";
import { CompanyModule } from "./company/company.module";
import { UtilsModule } from "./utils/utils.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { typeOrmModuleOptions } from "./db/configs/typeorm.config";
import { DataSource } from "typeorm";

@Module({
	imports: [TypeOrmModule.forRoot(typeOrmModuleOptions), CompanyModule, UtilsModule],
	controllers: [],
	providers: [],
})
export class AppModule {
	constructor(private dataSource: DataSource) {}
}
