<<<<<<< HEAD
import { Column, Entity, ManyToOne, PrimaryColumn, CreateDateColumn, JoinColumn } from "typeorm";
import { CompanyInfo } from "./CompanyInfo.entity";
=======
import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn, CreateDateColumn, JoinColumn } from "typeorm";
import { CompanyInfo } from "./CompanyInfo.entity";
import { BalanceSheet } from "./BalanceSheet.entity";
import { IncomeStatement } from "./IncomeStatement.entity";
import { FinancialRatio } from "./FinancialRatio.entity";
import { ProfitRatio } from "./ProfitRatio.entity";
>>>>>>> dev

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
<<<<<<< HEAD
=======
		unique: true,
>>>>>>> dev
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
<<<<<<< HEAD
=======

	@OneToMany(() => BalanceSheet, (balanceSheet) => balanceSheet.stock_info, { cascade: true })
	balance_sheets: BalanceSheet[];

	@OneToMany(() => IncomeStatement, (incomeStatement) => incomeStatement.stock_info, { cascade: true })
	income_statements: IncomeStatement[];

	@OneToMany(() => FinancialRatio, (financialRatio) => financialRatio.stock_info, { cascade: true })
	financial_ratios: FinancialRatio[];

	@OneToMany(() => ProfitRatio, (profitRatio) => profitRatio.stock_info, { cascade: true })
	profit_ratios: ProfitRatio[];
>>>>>>> dev
}
