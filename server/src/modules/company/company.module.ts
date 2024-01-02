import { Module } from "@nestjs/common";
import { CompanyController } from "./company.controller";
import { CompanyService } from "./company.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CompanyInfo } from "../../entities/CompanyInfo.entity";
import { StockInfo } from "../../entities/StockInfo.entity";
import { BalanceSheet } from "src/entities/BalanceSheet.entity";
import { IncomeStatement } from "src/entities/IncomeStatement.entity";
import { ProfitRatio } from "src/entities/ProfitRatio.entity";
import { FinancialRatio } from "src/entities/FinancialRatio.entity";
import { CacheModule } from "@nestjs/cache-manager";

@Module({
	imports: [
		CacheModule.register(),
		TypeOrmModule.forFeature([CompanyInfo, StockInfo, BalanceSheet, IncomeStatement, FinancialRatio, ProfitRatio]),
	],
	controllers: [CompanyController],
	providers: [CompanyService],
})
export class CompanyModule {}
