import React from "react";
import { ProfitRatioProps } from "./types/Finance/interface";

const ProfitRatio: React.FC<ProfitRatioProps> = ({ profitRatioData }) => {
	return (
		<div className="w-full">
			<div className="text-3xl font-gothic-ai">수익성비율</div>
		</div>
	);
};

export default ProfitRatio;
