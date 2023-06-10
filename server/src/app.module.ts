import { Module } from "@nestjs/common";
import { CompanyModule } from "./modules/company/company.module";
import { UtilsModule } from "./modules/utils/utils.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { typeOrmModuleOptions } from "./db/configs/typeorm.config";
import { DataSource } from "typeorm";
import { WsModule } from "./modules/ws/ws.module";

@Module({
	imports: [TypeOrmModule.forRoot(typeOrmModuleOptions), CompanyModule, UtilsModule, WsModule],
	controllers: [],
	providers: [],
})
export class AppModule {
	constructor(private dataSource: DataSource) {}
}
