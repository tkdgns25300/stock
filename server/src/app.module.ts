import { Module } from "@nestjs/common";
import { CompanyModule } from "./company/company.module";
import { UtilsModule } from "./utils/utils.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { typeOrmModuleOptions } from "./database/configs/typeorm.config";

@Module({
	imports: [TypeOrmModule.forRoot(typeOrmModuleOptions), CompanyModule, UtilsModule],
	controllers: [],
	providers: [],
})
export class AppModule {}
