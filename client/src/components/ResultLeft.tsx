import React from "react";

interface ResultLeftProps {
	companyName: string | null;
	stockCode: string | null;
}

const ResultLeft: React.FC<ResultLeftProps> = ({ companyName, stockCode }) => {
	return (
		<div className="bg-black w-1/2 h-screen flex flex-col justify-center items-center">
			<h1>{companyName}</h1>
			<h2>{stockCode}</h2>
		</div>
	);
};

export default ResultLeft;
