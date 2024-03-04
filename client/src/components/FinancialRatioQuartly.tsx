import React, { Fragment } from "react";
import { FinancialRatioData, FinancialRatioQuartlyProps } from "./types/Finance/interface";

const FinancialRatioQuartly: React.FC<FinancialRatioQuartlyProps> = ({
	curFinancialRatioData,
	previousFinancialRatioData,
}) => {
	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		const year = date.getFullYear();
		const month = date.getMonth() + 1;
		return `${year}년 ${month}월`;
	};

	const formatValue = (value: number, unit: string) => {
		if (unit === "%") {
			return `${value.toFixed(2)}%`;
		}
		if (unit === "조" || unit === "억") {
			if (value >= 10000) {
				return `${(value / 10000).toFixed(2)}조`;
			}
			return `${value.toFixed(2)}억`;
		}
		if (unit === "원") {
			return `${value.toFixed(0)}원`;
		}
		return value.toFixed(2); // 단위가 없는 경우
	};

	const dataItems: { label: string; key: keyof FinancialRatioData; unit: string }[] = [
		{ label: "매출액 증가율", key: "grs", unit: "" },
		{ label: "영업이익 증가율", key: "bsopPrfiInrt", unit: "" },
		{ label: "순이익 증가율", key: "ntinInrt", unit: "" },
		{ label: "ROE", key: "roeVal", unit: "" },
		{ label: "EPS", key: "eps", unit: "" },
		{ label: "주당매출액", key: "sps", unit: "" },
		{ label: "BPS", key: "bps", unit: "" },
		{ label: "유보비율", key: "rsrvRate", unit: "" },
		{ label: "부채비율", key: "lbltRate", unit: "" },
	];

	return (
		<div className="relative w-auto m-10 font-gothic-a1">
			<div className="mb-2 flex justify-between font-semibold tablet:text-sm text-xs text-gray-500">
				<span>(KRW)</span>
				<span>{formatDate(curFinancialRatioData.stacYymm)}</span>
			</div>
			<div className="border-b border-gray w-full mx-auto my-4"></div>
			{dataItems.map((item) => (
				<Fragment key={item.key}>
					<div className="mb-2 flex justify-between font-medium tablet:text-base text-xs">
						<span>{item.label}</span>
						<span>{formatValue(Number(curFinancialRatioData[item.key]), item.unit)}</span>
					</div>
					<div className="border-b border-gray w-full mx-auto my-4"></div>
				</Fragment>
			))}
		</div>
	);
};

export default FinancialRatioQuartly;
