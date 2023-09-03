import React from "react";
import { FinancialRatioProps } from "./types/Finance/interface";

const FinancialRatio: React.FC<FinancialRatioProps> = ({ financialRatioData }) => {
	return (
		<div className="w-full">
			<div className="text-3xl font-gothic-ai">재무비율</div>
		</div>
	);
};

export default FinancialRatio;
