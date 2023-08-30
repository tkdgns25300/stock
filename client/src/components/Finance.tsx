import React, { useEffect, useState } from "react";
import FinancialRatio from "./FinancialRatio";
import IncomeStatement from "./IncomeStatement";
import BalanceSheet from "./BalanceSheet";
import { IoMdArrowDown } from "react-icons/io";
import {
	BalanceSheetData,
	FinanceProps,
	FinancialRatioData,
	IncomeStatementData,
	ProfitRatioData,
} from "./types/Chart/interface";
import ProfitRatio from "./ProfitRatio";

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
				const transformedIncomeStatementData: IncomeStatementData[] = data.result.incomeStatement.map((item: any) => ({
					stacYymm: item.stac_yymm,
					saleAccount: item.sale_account,
					saleCost: item.sale_cost,
					saleTotlPrfi: item.sale_totl_prfi,
					bsopPrti: item.bsop_prti,
					opPrfi: item.op_prfi,
					specPrfi: item.spec_prfi,
					specLoss: item.spec_loss,
					thtrNtin: item.thtr_ntin,
				}));
				setIncomeStatementData(transformedIncomeStatementData);

				// 대차대조표 데이터 변환
				const transformedBalanceSheetData: BalanceSheetData[] = data.result.balanceSheet.map((item: any) => ({
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
				const transformedFinancialRatioData: FinancialRatioData[] = data.result.financialRatio.map((item: any) => ({
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
				const transformedProfitRatioData: ProfitRatioData[] = data.result.profitRatio.map((item: any) => ({
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
		<div className="relative w-full bg-white flex flex-col justify-start rounded-3xl p-6 z-20">
			<div>
				<button
					className="flex justify-between w-full py-2 focus:outline-none"
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

			<div>
				<button
					className="flex justify-between w-full py-2 focus:outline-none"
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

			<div>
				<button
					className="flex justify-between w-full py-2 focus:outline-none"
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

			<div>
				<button
					className="flex justify-between w-full py-2 focus:outline-none"
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
