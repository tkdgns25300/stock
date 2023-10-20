import React, { Fragment } from "react";
import { BalanceSheetData, BalanceSheetQuartlyProps } from "./types/Finance/interface";

const IncomeStatementQuartly: React.FC<BalanceSheetQuartlyProps> = ({
	curBalanceSheetData,
	previousBalanceSheetData,
}) => {
	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		const year = date.getFullYear();
		const month = date.getMonth() + 1;
		return `${year}년 ${month}월`;
	};

	const formatValue = (value: number) => {
		if (value >= 10000) {
			return `${(value / 10000).toFixed(2)}조`;
		}
		return `${value.toFixed(2)}억`;
	};

	const calculatePercentageChange = (current: number, previous: number) => {
		if (previous === 0) return "N/A";
		const change = ((current - previous) / previous) * 100;
		return change.toFixed(2) + "%";
	};

	const getColorForChange = (change: string) => {
		if (change === "N/A") return "text-gray-500";
		const changeValue = parseFloat(change);
		if (changeValue > 0) return "text-red-500";
		if (changeValue < 0) return "text-blue-500";
		return "text-gray-500";
	};

	const dataItems: { label: string; key: keyof BalanceSheetData }[] = [
		{ label: "자산총계", key: "totalAset" },
		{ label: "유동자산", key: "cras" },
		{ label: "고정자산", key: "fxas" },
		{ label: "자본총계", key: "totalCptl" },
		{ label: "자본금", key: "cpfn" },
		{ label: "부채총계", key: "totalLblt" },
		{ label: "유동부채", key: "flow_lblt" },
		{ label: "고정부채", key: "fix_lblt" },
	];

	return (
		<div className="relative w-auto m-10 font-gothic-a1">
			<div className="mb-2 flex justify-between font-semibold text-sm text-gray-500">
				<span>(KRW)</span>
				<span className="absolute right-56">{formatDate(curBalanceSheetData.stacYymm)}</span>
				<span>지난분기 대비 변동</span>
			</div>
			<div className="border-b border-gray w-full mx-auto my-4"></div>
			{dataItems.map((item) => (
				<Fragment key={item.key}>
					<div className="mb-2 flex justify-between font-medium text-base">
						<span className="">{item.label}</span>
						<span className="absolute right-56 pl-12">{formatValue(Number(curBalanceSheetData[item.key]))}</span>
						<span
							className={`ml-2 font-bold ${getColorForChange(
								calculatePercentageChange(
									Number(curBalanceSheetData[item.key]),
									Number(previousBalanceSheetData[item.key]),
								),
							)}`}
						>
							{calculatePercentageChange(
								Number(curBalanceSheetData[item.key]),
								Number(previousBalanceSheetData[item.key]),
							)}
						</span>
					</div>
					<div className="border-b border-gray w-full mx-auto my-4"></div>
				</Fragment>
			))}
		</div>
	);
};

export default IncomeStatementQuartly;
