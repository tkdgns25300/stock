import React from "react";
import { InvestmentOpinionItemProps } from "./types/InvestmentOpinion/interface";

const InvestmentOpinionItem: React.FC<InvestmentOpinionItemProps> = ({
	stckBsopDate,
	invtOpnn,
	stckPrpr,
	mbcrName,
	htsGoalPrc,
}) => {
	const htsGoalPrcNum = parseFloat(htsGoalPrc.replace(/,/g, ""));
	const stckPrprNum = parseFloat(stckPrpr.replace(/,/g, ""));
	const disparityRate = ((htsGoalPrcNum - stckPrprNum) / stckPrprNum) * 100;
	const isHigher = htsGoalPrcNum > stckPrprNum;
	const isLower = htsGoalPrcNum < stckPrprNum;

	const textColorClass = isHigher ? "text-red-500" : isLower ? "text-blue-500" : "text-gray-500";

	return (
		<tr>
			<td className="px-4 py-2 border border-gray-200">{stckBsopDate}</td>
			<td className={`tablet:table-cell hidden px-4 py-2 border border-gray-200 ${textColorClass}`}>{invtOpnn}</td>
			<td className={`px-4 py-2 border border-gray-200 ${textColorClass}`}>{htsGoalPrcNum.toLocaleString()}</td>
			<td className={`tablet:table-cell hidden px-4 py-2 border border-gray-200 ${textColorClass}`}>
				{disparityRate.toFixed(2)}%
			</td>
			<td className="px-4 py-2 border border-gray-200">{mbcrName}</td>
		</tr>
	);
};

export default InvestmentOpinionItem;
