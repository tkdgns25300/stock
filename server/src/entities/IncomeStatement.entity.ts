import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { StockInfo } from "./StockInfo.entity";

@Entity("income_statement")
export class IncomeStatement {
	@PrimaryGeneratedColumn({
		comment: "손익계산서 아이디",
	})
	id: number;

	@Column({
		type: "datetime",
		comment: "결산 년월",
	})
	stac_yymm: Date;

	@Column({
		type: "bigint",
		comment: "매출액",
	})
	sale_account: number;

	@Column({
		type: "bigint",
		comment: "매출 원가",
	})
	sale_cost: number;

	@Column({
		type: "bigint",
		comment: "매출 총 이익",
	})
	sale_totl_prfi: number;

	@Column({
		type: "bigint",
		comment: "영업 이익",
	})
	bsop_prti: number;

	@Column({
		type: "bigint",
		comment: "경상 이익",
	})
	op_prfi: number;

	@Column({
		type: "bigint",
		comment: "특별 이익",
	})
	spec_prfi: number;

	@Column({
		type: "bigint",
		comment: "특별 손실",
	})
	spec_loss: number;

	@Column({
		type: "bigint",
		comment: "당기순이익",
	})
	thtr_ntin: number;

	@OneToOne(() => StockInfo, (stockInfo) => stockInfo.income_statement)
	stock_info: StockInfo;
}
