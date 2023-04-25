import { Module } from "@nestjs/common";
import { UtilsController } from "./utils.controller";
import { UtilsService } from "./utils.service";
import { CompanyInfoRepository } from "../company/repository/CompanyInfo.repository";
import { StockInfoRepository } from "../company/repository/StockInfo.repository";

@Module({
	controllers: [UtilsController],
	providers: [UtilsService, CompanyInfoRepository, StockInfoRepository],
	exports: [CompanyInfoRepository, StockInfoRepository],
})
export class UtilsModule {}
