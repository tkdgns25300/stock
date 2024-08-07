import React, { useEffect, useState } from "react";
import { InvestmentOpinionData, InvestmentOpinionProps } from "./types/InvestmentOpinion/interface";
import InvestmentOpinionItem from "./InvestmentOpinionItem";

const InvestmentOpinion: React.FC<InvestmentOpinionProps> = ({ stockCode }) => {
	const [opinions, setOpinions] = useState<InvestmentOpinionData[]>([]);
	const [page, setPage] = useState<number>(1);
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

	const handleLoadMore = () => {
		setPage((prevPage) => prevPage + 1);
	};

	return (
		<div className="font-doHyeon desktop:text-base tablet:text-sm text-xs font-semibold relative w-full bg-white flex flex-col justify-start rounded-3xl p-6 z-20 font-gothic-a1">
			{loading ? (
				<div>Loading...</div>
			) : (
				<table className=" bg-white border border-gray-300">
					<thead className="bg-gray-100">
						<tr>
							<th className="tablet:px-4 p-auto py-2 border border-gray-300">발표일</th>
							<th className="hidden tablet:table-cell tablet:px-4 p-auto py-2 border border-gray-300">투자 의견</th>
							<th className="tablet:px-4 p-auto py-2 border border-gray-300">목표가</th>
							<th className="hidden tablet:table-cell tablet:px-4 p-auto py-2 border border-gray-300">괴리율</th>
							<th className="tablet:px-4 p-auto py-2 border border-gray-300">증권사명</th>
						</tr>
					</thead>
					<tbody className="">
						{opinions.slice(0, page * 5).map((opinion, index) => (
							<InvestmentOpinionItem
								key={index}
								stckBsopDate={opinion.stckBsopDate}
								invtOpnn={opinion.invtOpnn}
								stckPrpr={opinion.stckPrpr}
								mbcrName={opinion.mbcrName}
								htsGoalPrc={opinion.htsGoalPrc}
							/>
						))}
					</tbody>
				</table>
			)}
			{opinions.length > page * 5 && (
				<button onClick={handleLoadMore} className="mt-4 py-2 px-4 font-bold rounded-md bg-gray-100 hover:bg-gray-300">
					Load More
				</button>
			)}
		</div>
	);
};

export default InvestmentOpinion;
