<<<<<<< HEAD
import React from "react";
import ChartDiagram from "./ChartDiagram";
import ChartRealTimePrice from "./ChartRealTimePrice";

interface ChartProps {
	stockCode: string;
}

const Chart: React.FC<ChartProps> = ({ stockCode }) => {
	return (
		<div className="w-full">
			<ChartDiagram stockCode={stockCode} />
			<ChartRealTimePrice stockCode={stockCode} />
=======
import React, { useEffect, useState } from "react";
import ChartDiagram from "./ChartDiagram";
import ChartRealTimePrice from "./ChartRealTimePrice";
import ChartSummary from "./ChartSummary";
import {
	APIData,
	ChartDiagramData,
	ChartProps,
	PriceInfoData,
	Query,
	RealTimePriceData,
} from "./types/Chart/interface";
import { PeriodDiv } from "./types/Chart/enum";

const Chart: React.FC<ChartProps> = ({ stockCode }) => {
	const [chartDiagramData, setChartData] = useState<ChartDiagramData[]>([]);
	const [periodDiv, setPeriodDiv] = useState<PeriodDiv>(PeriodDiv.DAILY);
	const [loading, setLoading] = useState(true);
	const [realTimePriceData, setRealTimePriceData] = useState<RealTimePriceData>({} as RealTimePriceData);
	const [priceInfoData, setPriceInfoData] = useState<PriceInfoData>({} as PriceInfoData);

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
			} catch (error) {
				console.error("Error fetching chart data:", error);
			}
		};

		fetchData().then(() => setLoading(false)); // fetchData가 완료되면 loading을 false로 설정
	}, [periodDiv, stockCode]);

	useEffect(() => {
		const fetchCurrentPrice = async () => {
			try {
				const response = await fetch(`${process.env.REACT_APP_API_SERVER_URI}/company/price-info/${stockCode}`);
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				const data = await response.json();
				setRealTimePriceData({
					currentPrice: data.result.stckPrpr,
					prdyVrss: data.result.prdyVrss,
					prdyVrssSign: data.result.prdyVrssSign,
				});
				setPriceInfoData(data.result);
			} catch (error) {
				console.error("Error fetching price info:", error);
			}
		};

		fetchCurrentPrice().then(() => setLoading(false)); // fetchCurrentPrice가 완료되면 loading을 false로 설정
	}, [stockCode]);

	const handlePeriodDivChange = (newPeriodDiv: PeriodDiv) => {
		setPeriodDiv(newPeriodDiv);
	};

	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<div className="w-full flex bg-white relative rounded-3xl p-6 z-20">
			<div className="w-2/3">
				<ChartDiagram chartDiagramData={chartDiagramData} handlePeriodDivChange={handlePeriodDivChange} />
			</div>
			<div className="w-1/3 flex flex-col items-center">
				<ChartRealTimePrice stockCode={stockCode} realTimePriceData={realTimePriceData} />
				<ChartSummary priceInfoData={priceInfoData} />
			</div>
>>>>>>> dev
		</div>
	);
};

export default Chart;
