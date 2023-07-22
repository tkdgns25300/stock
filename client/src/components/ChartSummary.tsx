import React from "react";
import { ChartSummaryProps } from "./types/Chart/interface";

const ChartSummary: React.FC<ChartSummaryProps> = ({ priceInfoData }) => {
	return (
		<div>
			<div>{priceInfoData.htsAvls}</div>
			<div>{priceInfoData.stckHgpr}</div>
			<div>{priceInfoData.stckLwpr}</div>
			<div>{priceInfoData.stckYtd}</div>
			<div>{priceInfoData.w52Hgpr}</div>
			<div>{priceInfoData.w52Lwpr}</div>
		</div>
	);
};

export default ChartSummary;
