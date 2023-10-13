import React, { useEffect, useState } from "react";
import { InvestmentOpinionData, InvestmentOpinionProps } from "./types/InvestmentOpinion/interface";

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
				<table>
					<thead>
						<tr>
							<th>증권사명</th>
							<th>발표일</th>
							<th>투자 의견</th>
							<th>투자 의견 구분코드</th>
							<th>목표가</th>
						</tr>
					</thead>
					<tbody>
						{opinions.map((opinion, index) => (
							<tr key={index}>
								<td>{opinion.mbcrName}</td>
								<td>{opinion.stckBsopDate}</td>
								<td>{opinion.invtOpnn}</td>
								<td>{opinion.invtOpnnClsCode}</td>
								<td>{opinion.htsGoalPrc.toLocaleString()}</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</div>
	);
};

export default InvestmentOpinion;
