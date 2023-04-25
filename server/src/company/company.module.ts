import { Module } from "@nestjs/common";
import { CompanyController } from "./company.controller";
import { CompanyService } from "./company.service";
import { TypeOrmExModule } from "src/database/typeorm-ex.module";
import { CompanyInfoRepository } from "./repository/CompanyInfo.repository";
import { StockInfoRepository } from "./repository/StockInfo.repository";

@Module({
	imports: [TypeOrmExModule.forCustomRepository([CompanyInfoRepository, StockInfoRepository])],
	controllers: [CompanyController],
	providers: [CompanyService, CompanyInfoRepository, StockInfoRepository],
	exports: [CompanyInfoRepository, StockInfoRepository],
})
export class CompanyModule {}
