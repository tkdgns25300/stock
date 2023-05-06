import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CompanyInfo } from "src/entities/CompanyInfo.entity";
import { StockInfo } from "src/entities/StockInfo.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ApiResponse } from "src/dtos/ApiResponse.dto";
import { CompanySearchDto } from "src/dtos/CompanySearch.dto";

@Injectable()
export class CompanyService {
	constructor(
		@InjectRepository(CompanyInfo)
		private companyInfoRepository: Repository<CompanyInfo>,
		@InjectRepository(StockInfo)
		private stockInfoRepository: Repository<StockInfo>,
	) {}

	async getStockList(): Promise<ApiResponse<StockInfo[]>> {
		try {
			const stockList = await this.stockInfoRepository
				.createQueryBuilder("stock_info")
				.innerJoin("stock_info.company_info", "company_info")
				.select([
					"company_info.name AS company_name",
					"stock_info.stock_code AS stock_code",
					"stock_info.stock_type AS stock_type",
				])
				.getRawMany();

			return new ApiResponse<StockInfo[]>(stockList, "Successfully fetched stock list");
		} catch (error) {
			throw new Error(`Failed to fetch stock list: ${error.message}`);
		}
	}

	private async findCompanyByName(name: string): Promise<CompanyInfo | null> {
		return await this.companyInfoRepository.findOne({
			where: { name },
		});
	}

	private async findCompanyByStockCode(stockCode: string): Promise<CompanyInfo | null> {
		const stockInfo = await this.stockInfoRepository.findOne({
			where: { stock_code: stockCode },
			relations: ["company_info"],
		});
		return stockInfo ? stockInfo.company_info : null;
	}

	async getCompanyInfoBySearch(companySearchDto: CompanySearchDto): Promise<ApiResponse<CompanyInfo>> {
		try {
			const { name, stockCode } = companySearchDto;
			let companyInfo: CompanyInfo | null = null;

			if (name) {
				companyInfo = await this.findCompanyByName(name);
			} else if (stockCode) {
				companyInfo = await this.findCompanyByStockCode(stockCode);
			}

			if (!companyInfo) {
				return new ApiResponse<CompanyInfo>(null, "Company not found", HttpStatus.NOT_FOUND);
			}

			return new ApiResponse<CompanyInfo>(companyInfo, "Successfully fetched company info");
		} catch (error) {
			throw new Error(`Failed to fetch company info: ${error.message}`);
		}
	}
}
