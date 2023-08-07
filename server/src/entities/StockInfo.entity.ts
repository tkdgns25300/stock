import { Column, Entity, OneToOne, PrimaryColumn, CreateDateColumn, JoinColumn, ManyToOne } from "typeorm";
import { CompanyInfo } from "./CompanyInfo.entity";
import { BalanceSheet } from "./BalanceSheet.entity";
import { IncomeStatement } from "./IncomeStatement.entity";
import { FinancialRatio } from "./FinancialRatio.entity";
import { ProfitRatio } from "./ProfitRatio.entity";

@Entity("stock_info")
export class StockInfo {
	@PrimaryColumn({
		type: "varchar",
		length: 15,
		comment: "표준코드",
	})
	standard_code: string;

	@Column({
		type: "varchar",
		length: 10,
		comment: "종목코드",
	})
	stock_code: string;

	@CreateDateColumn({
		type: "datetime",
		comment: "상장일",
	})
	listing_date: Date;

	@Column({
		type: "varchar",
		length: 20,
		comment: "액면가",
	})
	face_value: string;

	@Column({
		type: "bigint",
		comment: "상장주식수",
	})
	listed_shares: number;

	@Column({
		type: "varchar",
		length: 20,
		comment: "시장구분",
	})
	market_type: string;

	@Column({
		type: "varchar",
		length: 20,
		comment: "주식종류",
	})
	stock_type: string;

	@Column({
		type: "varchar",
		length: 50,
		nullable: true,
		comment: "소속부",
	})
	affiliation: string | null;

	@Column({
		type: "varchar",
		length: 100,
		comment: "증권구분",
	})
	security_type: string;

	@ManyToOne(() => CompanyInfo, (companyInfo) => companyInfo.stock_infos)
	@JoinColumn({ name: "company_info" })
	company_info: CompanyInfo;

	@OneToOne(() => BalanceSheet, (balanceSheet) => balanceSheet.stock_info)
	@JoinColumn({ name: "balance_sheet_id" })
	balance_sheet: BalanceSheet;

	@OneToOne(() => IncomeStatement, (incomeStatement) => incomeStatement.stock_info)
	@JoinColumn({ name: "income_statement_id" })
	income_statement: IncomeStatement;

	@OneToOne(() => FinancialRatio, (financialRatio) => financialRatio.stock_info)
	@JoinColumn({ name: "financial_ratio_id" })
	financial_ratio: FinancialRatio;

	@OneToOne(() => ProfitRatio, (profitRatio) => profitRatio.stock_info)
	@JoinColumn({ name: "profit_ratio_id" })
	profit_ratio: ProfitRatio;
}
