import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}
