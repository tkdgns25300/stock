import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CompanyInfo } from "src/entities/CompanyInfo.entity";
import { StockInfo } from "src/entities/StockInfo.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ApiResponse } from "src/dtos/ApiResponse.dto";
import { CompanySearchDto } from "src/dtos/CompanySearch.dto";
import { ChartDataQueryDto } from "src/dtos/StockPriceSearch.dto";
import { StockPriceByPeriodData } from "src/types/StockPriceByPeriodData";
import { getToken } from "src/util/token/token";
import { StockPriceInfoData } from "src/types/StockPriceInfoData";

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

	async getChartData(query: ChartDataQueryDto): Promise<ApiResponse<StockPriceByPeriodData[]>> {
		try {
			const token = await getToken();
			const headers = {
				"Content-Type": "application/json; charset=utf-8",
				appkey: process.env.KIS_APP_KEY,
				appsecret: process.env.KIS_APP_SECRET,
				tr_id: "FHKST03010100",
				custtype: "P",
				Authorization: `Bearer ${token}`,
			};
			const response = await fetch(
				`https://openapi.koreainvestment.com:9443/uapi/domestic-stock/v1/quotations/inquire-daily-itemchartprice?FID_COND_MRKT_DIV_CODE=${query.fidCondMrktDivCode}&FID_INPUT_ISCD=${query.fidInputIscd}&FID_INPUT_DATE_1=${query.fidInputDate1}&FID_INPUT_DATE_2=${query.fidInputDate2}&FID_PERIOD_DIV_CODE=${query.fidPeriodDivCode}&FID_ORG_ADJ_PRC=${query.fidOrgAdjPrc}`,
				{ headers },
			);
			const data = await response.json();
			const returnData: StockPriceByPeriodData[] = data.output2.map((item) => ({
				stckBsopDate: item.stck_bsop_date,
				stckClpr: item.stck_clpr,
				stckOprc: item.stck_oprc,
				stckHgpr: item.stck_hgpr,
				stckLwpr: item.stck_lwpr,
				acmlVol: item.acml_vol,
			}));

			return new ApiResponse<StockPriceByPeriodData[]>(returnData, "Successfully fetched chart data");
		} catch (error) {
			throw new HttpException(`Failed to fetch chart data: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async getPriceInfo(stockCode: string): Promise<ApiResponse<StockPriceInfoData>> {
		try {
			const token = await getToken();
			const headers = {
				appkey: process.env.KIS_APP_KEY,
				appsecret: process.env.KIS_APP_SECRET,
				tr_id: "FHKST01010100",
				Authorization: `Bearer ${token}`,
			};
			const response = await fetch(
				`https://openapi.koreainvestment.com:9443/uapi/domestic-stock/v1/quotations/inquire-price?FID_COND_MRKT_DIV_CODE=J&FID_INPUT_ISCD=${stockCode}`,
				{ headers },
			);
			const data = await response.json();

			const returnData: StockPriceInfoData = {
				stckPrpr: Number(data.output.stck_prpr),
				prdyVrss: Number(data.output.prdy_vrss),
				prdyVrssSign: Number(data.output.prdy_vrss_sign),
				stckHgpr: Number(data.output.stck_hgpr),
				stckLwpr: Number(data.output.stck_lwpr),
				w52Hgpr: Number(data.output.w52_hgpr),
				w52Lwpr: Number(data.output.w52_lwpr),
				htsAvls: Number(data.output.hts_avls),
			};

			return new ApiResponse<any>(returnData, "Successfully fetched the stock's price information");
		} catch (error) {
			throw new HttpException(`Failed to fetch current price: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
