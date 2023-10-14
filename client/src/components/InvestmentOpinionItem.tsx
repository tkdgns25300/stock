import React from "react";
import { InvestmentOpinionItemProps } from "./types/InvestmentOpinion/interface";

const InvestmentOpinionItem: React.FC<InvestmentOpinionItemProps> = ({
	stckBsopDate,
	invtOpnn,
	invtOpnnClsCode,
	mbcrName,
	htsGoalPrc,
}) => {
	return (
		<tr>
			<td className="px-4 py-2 border border-gray-300">{stckBsopDate}</td>
			<td className="px-4 py-2 border border-gray-300">{invtOpnn}</td>
			<td className="px-4 py-2 border border-gray-300">{invtOpnnClsCode}</td>
			<td className="px-4 py-2 border border-gray-300">{htsGoalPrc.toLocaleString()}</td>
			<td className="px-4 py-2 border border-gray-300">{mbcrName}</td>
		</tr>
	);
};

export default InvestmentOpinionItem;
