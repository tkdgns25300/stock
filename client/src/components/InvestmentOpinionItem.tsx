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
			<td>{mbcrName}</td>
			<td>{stckBsopDate}</td>
			<td>{invtOpnn}</td>
			<td>{invtOpnnClsCode}</td>
			<td>{htsGoalPrc.toLocaleString()}</td>
		</tr>
	);
};

export default InvestmentOpinionItem;
