import React from "react";
import { ChartSummaryProps } from "./types/Chart/interface";

const ChartSummary: React.FC<ChartSummaryProps> = ({ priceInfoData }) => {
	console.log(priceInfoData);
	return (
		// <div className="p-4 border rounded-lg max-w-xs mx-auto font-doHyeon text-xl">
		<div className="w-full p-4 border rounded-lg max-w-xs mx-auto font-gothic-ai text-sm text-gray-800">
			<div className="mb-2 flex justify-between">
				<span>전일 종가</span>
				<span className="font-bold text-base">₩{priceInfoData.stckPrpr - priceInfoData.prdyVrss}</span>
			</div>
			<div className="border-b border-gray w-full mx-auto my-4"></div>
			<div className="mb-2 flex justify-between">
				<span>일일 변동폭</span>
				<span className="font-bold text-base">
					₩{priceInfoData.stckLwpr} - ₩{priceInfoData.stckHgpr}
				</span>
			</div>
			<div className="border-b border-gray w-full mx-auto my-4"></div>
			<div className="mb-2 flex justify-between">
				<span>52주 변동폭</span>
				<span className="font-bold text-base">
					₩{priceInfoData.w52Lwpr} - ₩{priceInfoData.w52Hgpr}
				</span>
			</div>
			<div className="border-b border-gray w-full mx-auto my-4"></div>
			<div className="mb-2 flex justify-between">
				<span>시가총액(억)</span>
				<span className="font-bold text-base">{priceInfoData.htsAvls} (KRW)</span>
			</div>
		</div>
	);
};

export default ChartSummary;
