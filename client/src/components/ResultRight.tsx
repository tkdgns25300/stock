import React from "react";
import Chart from "./Chart";

interface ResultRightProps {
	companyName: string;
	stockCode: string;
	stockType: string;
}

const ResultRight: React.FC<ResultRightProps> = ({ companyName, stockCode, stockType }) => {
	return (
		<div className="bg-gray-200 text-black w-1/2 h-screen flex flex-col justify-start">
			<div className="relative mx-12 my-16 shadow-xl w-auto">
				<div className="absolute bg-green -top-14 bg-green-600 p-12 pt-4 rounded-3xl text-2xl font-doHyeon z-10">
					Chart
				</div>
				<Chart stockCode={stockCode} />
			</div>
		</div>
	);
};

export default ResultRight;
