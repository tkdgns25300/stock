import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { StockInfo } from "./StockInfo.entity";

@Entity("profit_ratio")
export class ProfitRatio {
	@PrimaryGeneratedColumn({
		comment: "수익성 비율 아이디",
	})
	id: number;

	@Column({
		type: "datetime",
		comment: "결산 년월",
	})
	stac_yymm: Date;

	@Column({
		type: "bigint",
		comment: "총자본 순이익율",
	})
	cptl_ntin_rate: number;

	@Column({
		type: "bigint",
		comment: "자기자본 순이익율",
	})
	self_cptl_ntin_inrt: number;

	@Column({
		type: "bigint",
		comment: "매출액 순이익율",
	})
	sale_ntin_rate: number;

	@Column({
		type: "bigint",
		comment: "매출액 총이익율",
	})
	sale_totl_rate: number;

	@ManyToOne(() => StockInfo, (stockInfo) => stockInfo.profit_ratios)
	@JoinColumn({ name: "stock_info", referencedColumnName: "stock_code" })
	stock_info: StockInfo;
}
