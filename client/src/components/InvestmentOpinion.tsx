import React, { useEffect, useState } from "react";
import { InvestmentOpinionProps } from "./types/InvestmentOpinion/interface";

const InvestmentOpinion: React.FC<InvestmentOpinionProps> = ({ stockCode }) => {
	return (
		<div className="relative w-full bg-white flex flex-col justify-start rounded-3xl p-6 z-20 font-gothic-a1">
			<div>{stockCode}</div>
		</div>
	);
};

export default InvestmentOpinion;
