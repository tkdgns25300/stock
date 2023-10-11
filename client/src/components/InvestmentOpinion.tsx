import React, { useEffect, useState } from "react";
import { InvestmentOpinionData, InvestmentOpinionProps } from "./types/InvestmentOpinion/interface";

const InvestmentOpinion: React.FC<InvestmentOpinionProps> = ({ stockCode }) => {
	const [opinions, setOpinions] = useState<InvestmentOpinionData[]>([]);
	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		const fetchNewsData = async () => {
			try {
				setLoading(true);
				const response = await fetch(`${process.env.REACT_APP_API_SERVER_URI}/company/investOpinion/${stockCode}`);
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				const investmentOpinionData = await response.json();

				setOpinions(investmentOpinionData.result);
			} catch (error) {
				console.error("Error fetching news:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchNewsData();
	}, [stockCode]);

	return (
		<div className="relative w-full bg-white flex flex-col justify-start rounded-3xl p-6 z-20 font-gothic-a1">
			<div>{stockCode}</div>
		</div>
	);
};

export default InvestmentOpinion;
