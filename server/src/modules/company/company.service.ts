import { Injectable } from "@nestjs/common";
import { CompanyInfo } from "src/entities/CompanyInfo.entity";
import { StockInfo } from "src/entities/StockInfo.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class CompanyService {
	constructor(
		@InjectRepository(CompanyInfo)
		private companyInfoRepository: Repository<CompanyInfo>,
		@InjectRepository(StockInfo)
		private stockInfoRepository: Repository<StockInfo>,
	) {}

	async getStockList(): Promise<any> {
		try {
			const stockList = await this.stockInfoRepository
				.createQueryBuilder("stock_info")
				.innerJoin("stock_info.company_info", "company_info")
				.select(["stock_info.stock_code", "stock_info.stock_type", "company_info.name AS company_name"])
				.getRawMany();

			return {
				result: stockList,
				message: "Successfully fetched stock list",
			};
		} catch (error) {
			throw new Error(`Failed to fetch stock list: ${error.message}`);
		}
	}
}
