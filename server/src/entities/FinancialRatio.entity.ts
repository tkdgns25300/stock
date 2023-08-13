import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { StockInfo } from "./StockInfo.entity";

@Entity("financial_ratio")
export class FinancialRatio {
	@PrimaryGeneratedColumn({
		comment: "재무비율 아이디",
	})
	id: number;

	@Column({
		type: "datetime",
		comment: "결산 년월",
	})
	stac_yymm: Date;

	@Column({
		type: "bigint",
		comment: "매출액 증가율",
	})
	grs: number;

	@Column({
		type: "bigint",
		comment: "영업 이익 증가율",
	})
	bsop_prfi_inrt: number;

	@Column({
		type: "bigint",
		comment: "순이익 증가율",
	})
	ntin_inrt: number;

	@Column({
		type: "bigint",
		comment: "ROE 값",
	})
	roe_val: number;

	@Column({
		type: "bigint",
		comment: "EPS",
	})
	eps: number;

	@Column({
		type: "bigint",
		comment: "주당매출액",
	})
	sps: number;

	@Column({
		type: "bigint",
		comment: "BPS",
	})
	bps: number;

	@Column({
		type: "bigint",
		comment: "유보 비율",
	})
	rsrv_rate: number;

	@Column({
		type: "bigint",
		comment: "부채 비율",
	})
	lblt_rate: number;

	@ManyToOne(() => StockInfo, (stockInfo) => stockInfo.financial_ratios)
	@JoinColumn({ name: "stock_code", referencedColumnName: "stock_code" })
	stock_info: StockInfo;
}
