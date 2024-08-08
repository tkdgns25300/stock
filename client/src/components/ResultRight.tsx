import React from "react";
import Chart from "./Chart";
import Finance from "./Finance";
import News from "./News";
import InvestmentOpinion from "./InvestmentOpinion";

interface ResultRightProps {
	companyName: string;
	stockCode: string;
	stockType: string;
}

const ResultRight: React.FC<ResultRightProps> = ({ companyName, stockCode, stockType }) => {
	return (
		<div className="w-screen desktop:w-1/2 h-screen bg-gray-200 text-black flex flex-col justify-start overflow-y-auto">
			<div className="relative mx-12 mt-24 mb-12 shadow-xl w-auto" style={{ borderRadius: "2rem" }}>
				<div className="tablet:text-2xl mobile:text-xl text-lg absolute bg-green -top-14 bg-green-600 desktop:px-12 mobile:px-8 px-6 pt-4 pb-20 rounded-3xl font-doHyeon z-10">
					Chart
				</div>
				<Chart stockCode={stockCode} />
			</div>
			<div className="relative mx-12 my-12 shadow-xl w-auto" style={{ borderRadius: "2rem" }}>
				<div className="tablet:text-2xl mobile:text-xl text-lg absolute bg-green -top-14 bg-green-600 desktop:px-12 mobile:px-8 px-6 pt-4 pb-20 rounded-3xl font-doHyeon z-10">
					Finance
				</div>
				<Finance stockCode={stockCode} />
			</div>
			<div className="relative mx-12 my-12 shadow-xl w-auto" style={{ borderRadius: "2rem" }}>
				<div className="tablet:text-2xl mobile:text-xl text-lg absolute bg-green -top-14 bg-green-600 desktop:px-12 mobile:px-8 px-6 pt-4 pb-20 rounded-3xl font-doHyeon z-10">
					News
				</div>
				<News companyName={companyName} />
			</div>
			<div className="relative mx-12 my-12 shadow-xl w-auto" style={{ borderRadius: "2rem" }}>
				<div className="tablet:text-2xl mobile:text-xl text-lg absolute bg-green -top-14 bg-green-600 desktop:px-12 mobile:px-8 px-6 pt-4 pb-20 rounded-3xl font-doHyeon z-10">
					Investment Opinion
				</div>
				<InvestmentOpinion stockCode={stockCode} />
			</div>
		</div>
	);
};

export default ResultRight;
