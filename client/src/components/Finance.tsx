import React, { useEffect, useState } from "react";
import FinancialRatio from "./FinancialRatio";
import IncomeStatement from "./IncomeStatement";
import BalanceSheet from "./BalanceSheet";
import ProfitRatio from "./ProfitRatio";
import { IoMdArrowDown } from "react-icons/io";
import {
	BalanceSheetData,
	FinanceProps,
	FinancialRatioData,
	IncomeStatementData,
	ProfitRatioData,
} from "./types/Finance/interface";

const Finance: React.FC<FinanceProps> = ({ stockCode }) => {
	const [IncomeStatementData, setIncomeStatementData] = useState<IncomeStatementData[]>([]);
	const [BalanceSheetData, setBalanceSheetData] = useState<BalanceSheetData[]>([]);
	const [FinancialRatioData, setFinancialRatioData] = useState<FinancialRatioData[]>([]);
	const [ProfitRatioData, setProfitRatioData] = useState<ProfitRatioData[]>([]);

	const [showIncomeStatement, setShowIncomeStatement] = useState(true);
	const [showBalanceSheet, setShowBalanceSheet] = useState(false);
	const [showFinancialRatio, setShowFinancialRatio] = useState(false);
	const [showProfitRatio, setShowProfitRatio] = useState(false);

	useEffect(() => {
		const fetchFinanceData = async () => {
			try {
				const response = await fetch(`${process.env.REACT_APP_API_SERVER_URI}/company/finance-info/${stockCode}`);
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				const data = await response.json();

				// 손익계산서 데이터 변환
				const incomeStatementData: IncomeStatementData[] = data.result.incomeStatement
					.map((item: any) => ({
						stacYymm: item.stac_yymm,
						saleAccount: Number(item.sale_account),
						saleCost: Number(item.sale_cost),
						saleTotlPrfi: Number(item.sale_totl_prfi),
						bsopPrti: Number(item.bsop_prti),
						opPrfi: Number(item.op_prfi),
						specPrfi: Number(item.spec_prfi),
						specLoss: Number(item.spec_loss),
						thtrNtin: Number(item.thtr_ntin),
					}))
					.reverse();

				// 누적 데이터 제거
				const transformedIncomeStatementData: IncomeStatementData[] = [];
				let currentYear: number | null = null;
				let cumulativeData: IncomeStatementData | null = null;

				incomeStatementData.forEach((item: IncomeStatementData) => {
					const year = new Date(item.stacYymm).getFullYear();

					if (year !== currentYear) {
						currentYear = year;
						cumulativeData = null;
					}

					if (!cumulativeData) {
						transformedIncomeStatementData.push(item);
					} else {
						transformedIncomeStatementData.push({
							...item,
							saleAccount: item.saleAccount - cumulativeData.saleAccount,
							saleCost: item.saleCost - cumulativeData.saleCost,
							saleTotlPrfi: item.saleTotlPrfi - cumulativeData.saleTotlPrfi,
							bsopPrti: item.bsopPrti - cumulativeData.bsopPrti,
							opPrfi: item.opPrfi - cumulativeData.opPrfi,
							thtrNtin: item.thtrNtin - cumulativeData.thtrNtin,
						});
					}
					cumulativeData = { ...item };
				});

				setIncomeStatementData(transformedIncomeStatementData);

				// 대차대조표 데이터 변환
				const transformedBalanceSheetData: BalanceSheetData[] = data.result.balanceSheet.reverse().map((item: any) => ({
					stacYymm: item.stac_yymm,
					totalAset: item.total_aset,
					totalLblt: item.total_lblt,
					totalCptl: item.total_cptl,
					cras: item.cras,
					fxas: item.fxas,
					flow_lblt: item.flow_lblt,
					fix_lblt: item.fix_lblt,
					cpfn: item.cpfn,
				}));
				setBalanceSheetData(transformedBalanceSheetData);

				// 재무비율 데이터 변환
				const transformedFinancialRatioData: FinancialRatioData[] = data.result.financialRatio
					.reverse()
					.map((item: any) => ({
						stacYymm: item.stac_yymm,
						grs: item.grs,
						bsopPrfiInrt: item.bsop_prfi_inrt,
						ntinInrt: item.ntin_inrt,
						roeVal: item.roe_val,
						eps: item.eps,
						sps: item.sps,
						bps: item.bps,
						rsrvRate: item.rsrv_rate,
						lbltRate: item.lblt_rate,
					}));
				setFinancialRatioData(transformedFinancialRatioData);

				// 수익성비율 데이터 변환
				const transformedProfitRatioData: ProfitRatioData[] = data.result.profitRatio.reverse().map((item: any) => ({
					stacYymm: item.stac_yymm,
					cptlNtinRate: item.cptl_ntin_rate,
					selfCptlNtinInrt: item.self_cptl_ntin_inrt,
					saleNtinRate: item.sale_ntin_rate,
					saleTotlRate: item.sale_totl_rate,
				}));
				setProfitRatioData(transformedProfitRatioData);
			} catch (error) {
				console.error("Error fetching Finance info:", error);
			}
		};

		fetchFinanceData();
	}, [stockCode]);

	return (
		<div className="relative w-full bg-white flex flex-col justify-start rounded-3xl p-6 z-20 font-gothic-a1 font-semibold text-lg">
			<div>
				<button
					className="flex justify-between w-full p-2 focus:outline-none"
					onClick={() => setShowIncomeStatement(!showIncomeStatement)}
				>
					<span>손익계산서</span>
					<span
						className={`transform transition-transform duration-300 ${showIncomeStatement ? "rotate-180" : "rotate-0"}`}
					>
						<IoMdArrowDown />
					</span>
				</button>
				<div
					className={`transition-max-height duration-500 ease-in-out-quint overflow-hidden ${
						showIncomeStatement ? "max-h-screen" : "max-h-0"
					}`}
				>
					{showIncomeStatement && <IncomeStatement incomeStatementData={IncomeStatementData} />}
				</div>
			</div>

			<div className="border-b border-gray-300 w-full mx-auto my-4"></div>

			<div>
				<button
					className="flex justify-between w-full p-2 focus:outline-none"
					onClick={() => setShowBalanceSheet(!showBalanceSheet)}
				>
					<span>대차대조표</span>
					<span
						className={`transform transition-transform duration-300 ${showBalanceSheet ? "rotate-180" : "rotate-0"}`}
					>
						<IoMdArrowDown />
					</span>
				</button>
				<div
					className={`transition-max-height duration-500 ease-in-out-quint overflow-hidden ${
						showBalanceSheet ? "max-h-screen" : "max-h-0"
					}`}
				>
					{showBalanceSheet && <BalanceSheet balanceSheetData={BalanceSheetData} />}
				</div>
			</div>

			<div className="border-b border-gray-300 w-full mx-auto my-4"></div>

			<div>
				<button
					className="flex justify-between w-full p-2 focus:outline-none"
					onClick={() => setShowFinancialRatio(!showFinancialRatio)}
				>
					<span>재무비율</span>
					<span
						className={`transform transition-transform duration-300 ${showFinancialRatio ? "rotate-180" : "rotate-0"}`}
					>
						<IoMdArrowDown />
					</span>
				</button>
				<div
					className={`transition-max-height duration-500 ease-in-out-quint overflow-hidden ${
						showFinancialRatio ? "max-h-screen" : "max-h-0"
					}`}
				>
					{showFinancialRatio && <FinancialRatio financialRatioData={FinancialRatioData} />}
				</div>
			</div>

			<div className="border-b border-gray-300 w-full mx-auto my-4"></div>

			<div>
				<button
					className="flex justify-between w-full p-2 focus:outline-none"
					onClick={() => setShowProfitRatio(!showProfitRatio)}
				>
					<span>수익성비율</span>
					<span
						className={`transform transition-transform duration-300 ${showProfitRatio ? "rotate-180" : "rotate-0"}`}
					>
						<IoMdArrowDown />
					</span>
				</button>
				<div
					className={`transition-max-height duration-500 ease-in-out-quint overflow-hidden ${
						showProfitRatio ? "max-h-screen" : "max-h-0"
					}`}
				>
					{showProfitRatio && <ProfitRatio profitRatioData={ProfitRatioData} />}
				</div>
			</div>
		</div>
	);
};

export default Finance;
