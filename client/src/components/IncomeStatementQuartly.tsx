import React, { Fragment } from "react";
import { IncomeStatementQuartlyProps, IncomeStatementData } from "./types/Finance/interface";

const IncomeStatementQuartly: React.FC<IncomeStatementQuartlyProps> = ({
	curIncomeStatementData,
	previousIncomeStatementData,
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

	const dataItems: { label: string; key: keyof IncomeStatementData }[] = [
		{ label: "매출액", key: "saleAccount" },
		{ label: "매출원가", key: "saleCost" },
		{ label: "매출총이익", key: "saleTotlPrfi" },
		{ label: "영업이익", key: "bsopPrti" },
		{ label: "경상이익", key: "opPrfi" },
		// { label: "특별이익", key: "specPrfi" },
		// { label: "특별손실", key: "specLoss" },
		{ label: "당기순이익", key: "thtrNtin" },
	];

	return (
		<div className="relative w-auto m-10 font-gothic-a1">
			<div className="mb-2 flex justify-between font-semibold tablet:text-sm text-xs text-gray-500">
				<span>(KRW)</span>
				<span className="mobile:block hidden absolute xl:right-56 desktop:right-40 tablet:right-56 right-32">
					{formatDate(curIncomeStatementData.stacYymm)}
				</span>
				<span>지난분기 대비 변동</span>
			</div>
			<div className="border-b border-gray w-full mx-auto my-4"></div>
			{dataItems.map((item) => (
				<Fragment key={item.key}>
					<div className="mb-2 flex justify-between font-medium tablet:text-base text-xs">
						<span className="">{item.label}</span>
						<span className="mobile:block hidden absolute xl:right-56 desktop:right-40 tablet:right-56 right-32 pl-12">
							{formatValue(Number(curIncomeStatementData[item.key]))}
						</span>
						<span
							className={`ml-2 font-bold ${getColorForChange(
								calculatePercentageChange(
									Number(curIncomeStatementData[item.key]),
									Number(previousIncomeStatementData[item.key]),
								),
							)}`}
						>
							{calculatePercentageChange(
								Number(curIncomeStatementData[item.key]),
								Number(previousIncomeStatementData[item.key]),
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
