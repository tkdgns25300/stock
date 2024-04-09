import { Test, TestingModule } from "@nestjs/testing";
import { CompanyController } from "./company.controller";
import { CompanyService } from "./company.service";
import { ApiResponse } from "src/dtos/ApiResponse.dto";
import { StockInfo } from "src/entities/StockInfo.entity";
import { CompanySearchDto } from "src/dtos/CompanySearch.dto";
import { CompanyInfo } from "src/entities/CompanyInfo.entity";
import { ChartDataQueryDto } from "src/dtos/StockPriceSearch.dto";
import { StockPriceInfoData } from "src/types/StockPriceInfoData";
import { StockPriceByPeriodData } from "src/types/StockPriceByPeriodData";
import { FinancialInfoData } from "src/types/FinancialInfoData";
import { InvestmentOpinionData } from "src/types/InvestmentOpinionData";
import request from "supertest";
import { INestApplication } from "@nestjs/common";
import { ProfitRatio } from "src/entities/ProfitRatio.entity";
import { FinancialRatio } from "src/entities/FinancialRatio.entity";
import { IncomeStatement } from "src/entities/IncomeStatement.entity";
import { BalanceSheet } from "src/entities/BalanceSheet.entity";

describe("CompanyController", () => {
	let app: INestApplication;
	let companyService: CompanyService;
});
