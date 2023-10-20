import React, { Fragment } from "react";
import { ProfitRatioData, ProfitRatioQuartlyProps } from "./types/Finance/interface";

const ProfitRatioQuartly: React.FC<ProfitRatioQuartlyProps> = ({ curProfitRatioData, previousProfitRatioData }) => {
	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		const year = date.getFullYear();
		const month = date.getMonth() + 1;
		return `${year}년 ${month}월`;
	};

	const formatValue = (value: number, unit: string) => {
		return `${value.toFixed(2)}%`;
	};

	const dataItems: { label: string; key: keyof ProfitRatioData; unit: string }[] = [
		{ label: "총자본 순이익율", key: "cptlNtinRate", unit: "%" },
		{ label: "자기자본 순이익율", key: "selfCptlNtinInrt", unit: "%" },
		{ label: "매출액 순이익율", key: "saleNtinRate", unit: "%" },
		{ label: "매출액 총이익율", key: "saleTotlRate", unit: "%" },
	];

	return (
		<div className="relative w-auto m-10 font-gothic-a1">
			<div className="mb-2 flex justify-between font-semibold text-sm text-gray-500">
				<span>(KRW)</span>
				<span>{formatDate(curProfitRatioData.stacYymm)}</span>
			</div>
			<div className="border-b border-gray w-full mx-auto my-4"></div>
			{dataItems.map((item) => (
				<Fragment key={item.key}>
					<div className="mb-2 flex justify-between font-medium text-base">
						<span>{item.label}</span>
						<span>{formatValue(Number(curProfitRatioData[item.key]), item.unit)}</span>
					</div>
					<div className="border-b border-gray w-full mx-auto my-4"></div>
				</Fragment>
			))}
		</div>
	);
};

export default ProfitRatioQuartly;
