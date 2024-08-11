import React, { useState, useEffect } from "react";
import Chart from "./Chart";
import Finance from "./Finance";
import News from "./News";
import InvestmentOpinion from "./InvestmentOpinion";

interface ResultRightProps {
	companyName: string;
	stockCode: string;
	stockType: string;
}

const ResultRight: React.FC<ResultRightProps> = ({ companyName, stockCode, stockType }) => {
	const [financeDataAvailable, setFinanceDataAvailable] = useState(false);

	useEffect(() => {
		const fetchFinanceData = async () => {
			try {
				const response = await fetch(`${process.env.REACT_APP_API_SERVER_URI}/company/finance-info/${stockCode}`);
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				const data = await response.json();
				const incomeStatementData = data.result.incomeStatement.length > 0;
				const balanceSheetData = data.result.balanceSheet.length > 0;
				const financialRatioData = data.result.financialRatio.length > 0;
				const profitRatioData = data.result.profitRatio.length > 0;

				setFinanceDataAvailable(incomeStatementData || balanceSheetData || financialRatioData || profitRatioData);
			} catch (error) {
				console.error("Error fetching Finance info:", error);
				setFinanceDataAvailable(false);
			}
		};

		fetchFinanceData();
	}, [stockCode]);

	return (
		<div className="w-screen desktop:w-1/2 h-screen bg-gray-200 text-black flex flex-col justify-start overflow-y-auto">
			<div className="relative mx-12 mt-24 mb-12 shadow-xl w-auto" style={{ borderRadius: "2rem" }}>
				<div className="tablet:text-2xl mobile:text-xl text-lg absolute bg-green -top-14 bg-green-600 desktop:px-12 mobile:px-8 pt-4 pb-20 rounded-3xl font-doHyeon z-10">
					Chart
				</div>
				<Chart stockCode={stockCode} />
			</div>
			{financeDataAvailable && (
				<div className="relative mx-12 my-12 shadow-xl w-auto" style={{ borderRadius: "2rem" }}>
					<div className="tablet:text-2xl mobile:text-xl text-lg absolute bg-green -top-14 bg-green-600 desktop:px-12 mobile:px-8 pt-4 pb-20 rounded-3xl font-doHyeon z-10">
						Finance
					</div>
					<Finance stockCode={stockCode} />
				</div>
			)}

			<div className="relative mx-12 my-12 shadow-xl w-auto" style={{ borderRadius: "2rem" }}>
				<div className="tablet:text-2xl mobile:text-xl text-lg absolute bg-green -top-14 bg-green-600 desktop:px-12 mobile:px-8 pt-4 pb-20 rounded-3xl font-doHyeon z-10">
					News
				</div>
				<News companyName={companyName} />
			</div>
			<div className="relative mx-12 my-12 shadow-xl w-auto" style={{ borderRadius: "2rem" }}>
				<div className="tablet:text-2xl mobile:text-xl text-lg absolute bg-green -top-14 bg-green-600 desktop:px-12 mobile:px-8 pt-4 pb-20 rounded-3xl font-doHyeon z-10">
					Investment Opinion
				</div>
				<InvestmentOpinion stockCode={stockCode} />
			</div>
		</div>
	);
};

export default ResultRight;
