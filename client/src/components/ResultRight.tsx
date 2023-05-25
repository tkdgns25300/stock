import React from "react";
import Chart from "./Chart";

interface ResultRightProps {
	companyName: string | null;
	stockCode: string | null;
	stockType: string | null;
}

const ResultRight: React.FC<ResultRightProps> = ({ companyName, stockCode, stockType }) => {
	return (
		<div className="bg-white text-black w-1/2 h-screen flex flex-col justify-center items-center">
			<h1>{companyName}</h1>
			<h2>{stockCode}</h2>
			<Chart />
		</div>
	);
};

export default ResultRight;
