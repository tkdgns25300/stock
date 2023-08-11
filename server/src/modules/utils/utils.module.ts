import { Module } from "@nestjs/common";
import { UtilsController } from "./utils.controller";
import { UtilsService } from "./utils.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { StockInfo } from "src/entities/StockInfo.entity";
import { CompanyInfo } from "src/entities/CompanyInfo.entity";
import { BalanceSheet } from "src/entities/BalanceSheet.entity";
import { IncomeStatement } from "src/entities/IncomeStatement.entity";
import { FinancialRatio } from "src/entities/FinancialRatio.entity";
import { ProfitRatio } from "src/entities/ProfitRatio.entity";

@Module({
	imports: [
		TypeOrmModule.forFeature([CompanyInfo, StockInfo, BalanceSheet, IncomeStatement, FinancialRatio, ProfitRatio]),
	],
	controllers: [UtilsController],
	providers: [UtilsService],
})
export class UtilsModule {}
