import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { StockInfo } from "./StockInfo.entity";

@Entity("balance_sheet")
export class BalanceSheet {
	@PrimaryGeneratedColumn({
		comment: "대차대조표 아이디",
	})
	id: number;

	@Column({
		type: "datetime",
		comment: "결산 년월",
	})
	stac_yymm: Date;

	@Column({
		type: "bigint",
		comment: "유동자산",
	})
	cras: number;

	@Column({
		type: "bigint",
		comment: "고정자산",
	})
	fxas: number;

	@Column({
		type: "bigint",
		comment: "자산총계",
	})
	total_aset: number;

	@Column({
		type: "bigint",
		comment: "유동부채",
	})
	flow_lblt: number;

	@Column({
		type: "bigint",
		comment: "고정부채",
	})
	fix_lblt: number;

	@Column({
		type: "bigint",
		comment: "부채총계",
	})
	total_lblt: number;

	@Column({
		type: "bigint",
		comment: "자본금",
	})
	cpfn: number;

	@Column({
		type: "bigint",
		comment: "자본총계",
	})
	total_cptl: number;

	@OneToOne(() => StockInfo, (stockInfo) => stockInfo.balance_sheet)
	stock_info: StockInfo;
}
