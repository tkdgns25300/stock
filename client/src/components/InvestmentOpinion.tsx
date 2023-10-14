import React, { useEffect, useState } from "react";
import { InvestmentOpinionData, InvestmentOpinionProps } from "./types/InvestmentOpinion/interface";
import InvestmentOpinionItem from "./InvestmentOpinionItem";

const InvestmentOpinion: React.FC<InvestmentOpinionProps> = ({ stockCode }) => {
	const [opinions, setOpinions] = useState<InvestmentOpinionData[]>([]);
	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		const fetchInvestmentData = async () => {
			try {
				setLoading(true);
				const response = await fetch(`${process.env.REACT_APP_API_SERVER_URI}/company/investOpinion/${stockCode}`);
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				const investmentOpinionData = await response.json();
				setOpinions(investmentOpinionData.result);
			} catch (error) {
				console.error("Error fetching investment data:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchInvestmentData();
	}, [stockCode]);

	return (
		<div className="relative w-full bg-white flex flex-col justify-start rounded-3xl p-6 z-20 font-gothic-a1">
			{loading ? (
				<div>Loading...</div>
			) : (
				<table className="min-w-full bg-white border border-gray-300">
					<thead className="bg-gray-100">
						<tr>
							<th className="px-4 py-2 border border-gray-300">발표일</th>
							<th className="px-4 py-2 border border-gray-300">투자 의견</th>
							<th className="px-4 py-2 border border-gray-300">투자 의견 구분 코드</th>
							<th className="px-4 py-2 border border-gray-300">목표가</th>
							<th className="px-4 py-2 border border-gray-300">증권사명</th>
						</tr>
					</thead>
					<tbody className="font-doHyeon font-2xl">
						{opinions.map((opinion, index) => (
							<InvestmentOpinionItem
								key={index}
								stckBsopDate={opinion.stckBsopDate}
								invtOpnn={opinion.invtOpnn}
								invtOpnnClsCode={opinion.invtOpnnClsCode}
								mbcrName={opinion.mbcrName}
								htsGoalPrc={opinion.htsGoalPrc}
							/>
						))}
					</tbody>
				</table>
			)}
		</div>
	);
};

export default InvestmentOpinion;
