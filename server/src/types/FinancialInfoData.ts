import { BalanceSheet } from "src/entities/BalanceSheet.entity";
import { FinancialRatio } from "src/entities/FinancialRatio.entity";
import { IncomeStatement } from "src/entities/IncomeStatement.entity";
import { ProfitRatio } from "src/entities/ProfitRatio.entity";

export interface FinancialInfoData {
	balanceSheet: BalanceSheet[];
	incomeStatement: IncomeStatement[];
	financialRatio: FinancialRatio[];
	profitRatio: ProfitRatio[];
}
