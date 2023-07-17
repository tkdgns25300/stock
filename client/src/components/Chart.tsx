import React, { useEffect, useState } from "react";
import ChartDiagram from "./ChartDiagram";
import ChartRealTimePrice from "./ChartRealTimePrice";
import { APIData, ChartDiagramData, ChartProps, Query } from "./types/Chart/interface";
import { PeriodDiv } from "./types/Chart/enum";

const Chart: React.FC<ChartProps> = ({ stockCode }) => {
	const [chartDiagramData, setChartData] = useState<ChartDiagramData[]>([]);
	const [loading, setLoading] = useState(true);
	const [periodDiv, setPeriodDiv] = useState<PeriodDiv>(PeriodDiv.DAILY);

	const handlePeriodDivChange = (newPeriodDiv: PeriodDiv) => {
		setPeriodDiv(newPeriodDiv);
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const today = new Date();
				const formatDate = (date: Date) => {
					const year = date.getFullYear();
					const month = String(date.getMonth() + 1).padStart(2, "0");
					const day = String(date.getDate()).padStart(2, "0");
					return `${year}${month}${day}`;
				};

				let fidInputDate1: string;
				const fidInputDate2 = formatDate(today);

				if (periodDiv === PeriodDiv.DAILY) {
					const threeMonthsAgo = new Date(today);
					threeMonthsAgo.setMonth(today.getMonth() - 3);
					fidInputDate1 = formatDate(threeMonthsAgo);
				} else if (periodDiv === PeriodDiv.WEEKLY) {
					const twoYearsAgo = new Date(today);
					twoYearsAgo.setFullYear(today.getFullYear() - 2);
					fidInputDate1 = formatDate(twoYearsAgo);
				} else if (periodDiv === PeriodDiv.MONTHLY) {
					const fiveYearsAgo = new Date(today);
					fiveYearsAgo.setFullYear(today.getFullYear() - 5);
					fidInputDate1 = formatDate(fiveYearsAgo);
				} else {
					const hundredYearsAgo = new Date(today);
					hundredYearsAgo.setFullYear(today.getFullYear() - 100);
					fidInputDate1 = formatDate(hundredYearsAgo);
				}

				const query: Query = {
					fidCondMrktDivCode: "J",
					fidInputIscd: stockCode,
					fidInputDate1,
					fidInputDate2,
					fidPeriodDivCode: periodDiv,
					fidOrgAdjPrc: "0",
				};

				const response = await fetch(
					`${process.env.REACT_APP_API_SERVER_URI}/company/chart-data?fidCondMrktDivCode=${query.fidCondMrktDivCode}&fidInputIscd=${query.fidInputIscd}&fidInputDate1=${query.fidInputDate1}&fidInputDate2=${query.fidInputDate2}&fidPeriodDivCode=${query.fidPeriodDivCode}&fidOrgAdjPrc=${query.fidOrgAdjPrc}`,
				);

				const data = await response.json();

				if (data.result) {
					const sortedData = data.result
						.filter((item: APIData) => Object.keys(item).length !== 0)
						.sort((a: APIData, b: APIData) => a.stckBsopDate.localeCompare(b.stckBsopDate));

					setChartData(
						sortedData.map((item: APIData) => ({
							name: `${parseInt(item.stckBsopDate.substring(4, 6), 10)}/${parseInt(
								item.stckBsopDate.substring(6, 8),
								10,
							)}`,
							date: `${item.stckBsopDate.substring(4, 6)}/${item.stckBsopDate.substring(
								6,
								8,
							)}/${item.stckBsopDate.substring(0, 4)}`,
							open: parseFloat(item.stckOprc),
							close: parseFloat(item.stckClpr),
							high: parseFloat(item.stckHgpr),
							low: parseFloat(item.stckLwpr),
							volume: parseFloat(item.acmlVol),
						})),
					);
				}
				setLoading(false);
			} catch (error) {
				console.error(error);
				setLoading(false);
			}
		};

		fetchData();
	}, [periodDiv, stockCode]);

	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<div className="w-full">
			<ChartDiagram chartDiagramData={chartDiagramData} handlePeriodDivChange={handlePeriodDivChange} />
			<ChartRealTimePrice stockCode={stockCode} />
		</div>
	);
};

export default Chart;
