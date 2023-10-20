import { Module } from "@nestjs/common";
import { CompanyController } from "./company.controller";
import { CompanyService } from "./company.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CompanyInfo } from "../../entities/CompanyInfo.entity";
import { StockInfo } from "../../entities/StockInfo.entity";
<<<<<<< HEAD

@Module({
	imports: [TypeOrmModule.forFeature([CompanyInfo, StockInfo])],
=======
import { BalanceSheet } from "src/entities/BalanceSheet.entity";
import { IncomeStatement } from "src/entities/IncomeStatement.entity";
import { ProfitRatio } from "src/entities/ProfitRatio.entity";
import { FinancialRatio } from "src/entities/FinancialRatio.entity";

@Module({
	imports: [
		TypeOrmModule.forFeature([CompanyInfo, StockInfo, BalanceSheet, IncomeStatement, FinancialRatio, ProfitRatio]),
	],
>>>>>>> dev
	controllers: [CompanyController],
	providers: [CompanyService],
})
export class CompanyModule {}
