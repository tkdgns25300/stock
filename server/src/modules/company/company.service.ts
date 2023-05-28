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

	async getChartData(): Promise<ApiResponse<any>> {
		try {
			const headers = {
				"Content-Type": "application/json; charset=utf-8",
				appkey: "PSr2axang31iCePXN2s7ekVDxtKrXhTgPCs2",
				appsecret:
					"CHew135tcQ1GMyh4G/A4uibl5FjYI3blt7vU/0/1Sk2x1izcjI1NbdbKMOeQy0TfRyObQgOg9iEO1m71epi7fGV2N5ts2daXPENBlLQ6DfD0fw4k3eVqXdCTYDJHIt1t7Mk7JFpzfAEYdJm8NzYnrVQSCCtmgyuJ0YkWEU0XGwVsWd5TgGE=",
				tr_id: "FHKST03010100",
				custtype: "P",
				Authorization:
					"Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0b2tlbiIsImF1ZCI6IjFlNjdkZjQ1LTMwZTAtNDZjNC1iNjNkLWZkMzVmN2Y5OTQ0YiIsInByZHRfY2QiOiIiLCJpc3MiOiJ1bm9ndyIsImV4cCI6MTcxNzU4MDEyMiwiaWF0IjoxNzE3NDkzNzIyLCJqdGkiOiJQU3IyYXhhbmczMWlDZVBYTjJzN2VrVkR4dEtyWGhUZ1BDczIifQ.qYZm12EKASEYYEWayqfMMUTPjNbxr3yVyPJ9bnn8oixXNFfxqQy1uLpXeltGoFLRKrqDexGOgucvV4bz0ZZvhA",
			};
			const query = {
				FID_COND_MRKT_DIV_CODE: "J",
				FID_INPUT_ISCD: "005930",
				FID_INPUT_DATE_1: "20240501",
				FID_INPUT_DATE_2: "20240531",
				FID_PERIOD_DIV_CODE: "D",
				FID_ORG_ADJ_PRC: "1",
			};
			const response = await fetch(
				"https://openapi.koreainvestment.com:9443/uapi/domestic-stock/v1/quotations/inquire-daily-itemchartprice?" +
					new URLSearchParams(query),
				{ headers },
			);
			const data = await response.json();
			const returnData = data.output2.map((item) => {
				return {
					stck_bsop_date: item.stck_bsop_date,
					stck_clpr: item.stck_clpr,
					stck_oprc: item.stck_oprc,
					stck_hgpr: item.stck_hgpr,
					stck_lwpr: item.stck_lwpr,
					acml_vol: item.acml_vol,
				};
			});

			return new ApiResponse<any>(returnData, "Successfully fetched chart data");
		} catch (error) {
			throw new HttpException(`Failed to fetch chart data: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
