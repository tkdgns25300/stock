import { Column, Entity, ManyToOne, PrimaryColumn, CreateDateColumn } from "typeorm";
import { CompanyInfo } from "./CompanyInfo.entity";

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
		type: "date",
		comment: "상장일",
	})
	listing_date: Date;

	@Column({
		type: "int",
		nullable: true,
		comment: "액면가",
	})
	face_value: number | null;

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
		length: 10,
		comment: "증권구분",
	})
	security_type: string;

	@ManyToOne(() => CompanyInfo, (companyInfo) => companyInfo.stock_infos)
	company_info: CompanyInfo;
}
