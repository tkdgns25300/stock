import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { StockInfo } from "./StockInfo.entity";

@Entity("company_info")
export class CompanyInfo {
	@PrimaryGeneratedColumn({
		comment: "회사 아이디",
	})
	id: number;

	@Column({
		type: "varchar",
		length: 100,
		comment: "한글명",
	})
	name: string;

	@Column({
		type: "varchar",
		length: 100,
		comment: "한글명 상세",
	})
	detailed_name: string;

	@Column({
		type: "varchar",
		length: 100,
		comment: "영문명",
	})
	english_name: string;

	@Column({
		type: "text",
		comment: "기업 설명",
	})
	description: string;

	@Column({
		type: "varchar",
		length: 100,
		comment: "업종명",
	})
	industry_name: string;

	@Column({
		type: "varchar",
		length: 10,
		comment: "업종코드",
	})
	industry_code: string;

	@Column({
		type: "int",
		comment: "자본금",
	})
	capital: number;

	@Column({
		type: "varchar",
		length: 10,
		comment: "통화구분",
	})
	currency: string;

	@Column({
		type: "int",
		comment: "결산월",
	})
	fiscal_month: number;

	@Column({
		type: "varchar",
		length: 50,
		comment: "대표이사",
	})
	ceo: string;

	@Column({
		type: "varchar",
		length: 20,
		comment: "대표전화",
	})
	main_phone: string;

	@Column({
		type: "varchar",
		length: 200,
		comment: "주소",
	})
	address: string;

	@Column({
		type: "varchar",
		length: 100,
		comment: "홈페이지",
	})
	website: string;

	@CreateDateColumn({
		type: "date",
		comment: "설립일",
	})
	founded_date: Date;

	@OneToMany(() => StockInfo, (stockInfo) => stockInfo.company_info)
	stock_infos: StockInfo[];
}
