// import React, { useEffect, useState } from "react";
// import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// interface ChartProps {
// 	stockCode: string;
// }

// interface ChartData {
// 	stckBsopDate: string;
// 	stckOprc: number;
// 	stckClpr: number;
// 	stckHgpr: number;
// 	stckLwpr: number;
// 	acmlVol: number;
// }

// interface Query {
// 	fidCondMrktDivCode: string;
// 	fidInputIscd: string;
// 	fidInputDate1: string;
// 	fidInputDate2: string;
// 	fidPeriodDivCode: string;
// 	fidOrgAdjPrc: string;
// }

// enum PeriodDiv {
// 	DAILY = "D", // 3달치
// 	WEEKLY = "W", // 2년치
// 	MONTHLY = "M", // 5년치
// 	YEARLY = "Y", // 100년치
// }

// const Chart: React.FC<ChartProps> = ({ stockCode }) => {
// 	const [chartData, setChartData] = useState<ChartData[]>([]);
// 	const [loading, setLoading] = useState(true);
// 	const [periodDiv, setPeriodDiv] = useState<PeriodDiv>(PeriodDiv.DAILY);

// 	const handlePeriodDivChange = (newPeriodDiv: PeriodDiv) => {
// 		setPeriodDiv(newPeriodDiv);
// 	};

// 	useEffect(() => {
// 		const fetchData = async () => {
// 			try {
// 				const today = new Date();
// 				const formatDate = (date: Date) => {
// 					const year = date.getFullYear();
// 					const month = String(date.getMonth() + 1).padStart(2, "0");
// 					const day = String(date.getDate()).padStart(2, "0");
// 					return `${year}${month}${day}`;
// 				};

// 				let fidInputDate1: string;
// 				const fidInputDate2 = formatDate(today);

// 				if (periodDiv === PeriodDiv.DAILY) {
// 					const threeMonthsAgo = new Date(today);
// 					threeMonthsAgo.setMonth(today.getMonth() - 3);
// 					fidInputDate1 = formatDate(threeMonthsAgo);
// 				} else if (periodDiv === PeriodDiv.WEEKLY) {
// 					const twoYearsAgo = new Date(today);
// 					twoYearsAgo.setFullYear(today.getFullYear() - 2);
// 					fidInputDate1 = formatDate(twoYearsAgo);
// 				} else if (periodDiv === PeriodDiv.MONTHLY) {
// 					const fiveYearsAgo = new Date(today);
// 					fiveYearsAgo.setFullYear(today.getFullYear() - 5);
// 					fidInputDate1 = formatDate(fiveYearsAgo);
// 				} else {
// 					const hundredYearsAgo = new Date(today);
// 					hundredYearsAgo.setFullYear(today.getFullYear() - 100);
// 					fidInputDate1 = formatDate(hundredYearsAgo);
// 				}

// 				const query: Query = {
// 					fidCondMrktDivCode: "J",
// 					fidInputIscd: stockCode,
// 					fidInputDate1,
// 					fidInputDate2,
// 					fidPeriodDivCode: periodDiv,
// 					fidOrgAdjPrc: "0",
// 				};

// 				const response = await fetch(
// 					`${process.env.REACT_APP_SERVER_URI}/company/chart-data?fidCondMrktDivCode=${query.fidCondMrktDivCode}&fidInputIscd=${query.fidInputIscd}&fidInputDate1=${query.fidInputDate1}&fidInputDate2=${query.fidInputDate2}&fidPeriodDivCode=${query.fidPeriodDivCode}&fidOrgAdjPrc=${query.fidOrgAdjPrc}`,
// 				);

// 				const data = await response.json();
// 				const sortedData = data.result
// 					.filter((item: ChartData) => Object.keys(item).length !== 0)
// 					.sort((a: ChartData, b: ChartData) => a.stckBsopDate.localeCompare(b.stckBsopDate));

// 				setChartData(
// 					sortedData.map((item: ChartData) => ({
// 						name: `${parseInt(item.stckBsopDate.substring(4, 6), 10)}/${parseInt(
// 							item.stckBsopDate.substring(6, 8),
// 							10,
// 						)}`,
// 						date: `${item.stckBsopDate.substring(4, 6)}/${item.stckBsopDate.substring(
// 							6,
// 							8,
// 						)}/${item.stckBsopDate.substring(0, 4)}`,
// 						open: item.stckOprc,
// 						close: item.stckClpr,
// 						high: item.stckHgpr,
// 						low: item.stckLwpr,
// 						volume: item.acmlVol,
// 					})),
// 				);
// 				setLoading(false);
// 			} catch (error) {
// 				console.error(error);
// 				setLoading(false);
// 			}
// 		};

// 		fetchData();
// 	}, [periodDiv, stockCode]);

// 	if (loading) {
// 		return <div>Loading...</div>;
// 	}

// 	return (
// 		<div className="w-full">
// 			<div>
// 				<button onClick={() => handlePeriodDivChange(PeriodDiv.DAILY)}>일봉</button>
// 				<button onClick={() => handlePeriodDivChange(PeriodDiv.WEEKLY)}>주봉</button>
// 				<button onClick={() => handlePeriodDivChange(PeriodDiv.MONTHLY)}>월봉</button>
// 				<button onClick={() => handlePeriodDivChange(PeriodDiv.YEARLY)}>최대</button>
// 			</div>
// 			<ResponsiveContainer width="95%" height={window.innerHeight / 4}>
// 				<AreaChart
// 					width={1000}
// 					height={400}
// 					data={chartData}
// 					margin={{
// 						top: 40,
// 						right: 30,
// 						left: 0,
// 						bottom: 40,
// 					}}
// 				>
// 					<defs>
// 						<linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
// 							<stop offset="5%" stopColor="#FF0000" stopOpacity={0.8} />
// 							<stop offset="95%" stopColor="#FF0000" stopOpacity={0.2} />
// 						</linearGradient>
// 					</defs>
// 					<CartesianGrid strokeDasharray="3 3" />
// 					<XAxis dataKey="name" tickLine={false} axisLine={false} />
// 					<YAxis type="number" domain={[0, "dataMax"]} dataKey="close" orientation="right" tickSize={10} />
// 					<Tooltip />
// 					<Area type="monotone" dataKey="date" stroke="none" activeDot={false} fillOpacity={0} fill="#808080" />
// 					<Area type="monotone" dataKey="open" stroke="none" activeDot={false} fillOpacity={0} fill="#808080" />
// 					<Area type="monotone" dataKey="close" stroke="#8884d8" fillOpacity={1} fill="url(#color)" />
// 					<Area type="monotone" dataKey="high" stroke="none" activeDot={false} fillOpacity={0} fill="#808080" />
// 					<Area type="monotone" dataKey="low" stroke="none" activeDot={false} fillOpacity={0} fill="#808080" />
// 					<Area type="monotone" dataKey="volume" stroke="none" activeDot={false} fillOpacity={0} fill="#808080" />
// 				</AreaChart>
// 			</ResponsiveContainer>
// 		</div>
// 	);
// };

// export default Chart;

import React, { useEffect, useState } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface ChartProps {
	stockCode: string;
}

interface ChartData {
	name: string;
	date: string;
	open: number;
	close: number;
	high: number;
	low: number;
	volume: number;
}

interface Query {
	fidCondMrktDivCode: string;
	fidInputIscd: string;
	fidInputDate1: string;
	fidInputDate2: string;
	fidPeriodDivCode: string;
	fidOrgAdjPrc: string;
}

interface APIData {
	stckBsopDate: string;
	stckOprc: string;
	stckClpr: string;
	stckHgpr: string;
	stckLwpr: string;
	acmlVol: string;
}

enum PeriodDiv {
	DAILY = "D", // 3달치
	WEEKLY = "W", // 2년치
	MONTHLY = "M", // 5년치
	YEARLY = "Y", // 100년치
}

const Chart: React.FC<ChartProps> = ({ stockCode }) => {
	const [chartData, setChartData] = useState<ChartData[]>([]);
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
					`${process.env.REACT_APP_SERVER_URI}/company/chart-data?fidCondMrktDivCode=${query.fidCondMrktDivCode}&fidInputIscd=${query.fidInputIscd}&fidInputDate1=${query.fidInputDate1}&fidInputDate2=${query.fidInputDate2}&fidPeriodDivCode=${query.fidPeriodDivCode}&fidOrgAdjPrc=${query.fidOrgAdjPrc}`,
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

	const getMaxCloseValue = () => {
		const maxClose = Math.max(...chartData.map((data) => data.close));
		return Math.ceil(maxClose / 10000) * 10000;
	};

	return (
		<div className="w-full">
			<div>
				<button onClick={() => handlePeriodDivChange(PeriodDiv.DAILY)}>일봉</button>
				<button onClick={() => handlePeriodDivChange(PeriodDiv.WEEKLY)}>주봉</button>
				<button onClick={() => handlePeriodDivChange(PeriodDiv.MONTHLY)}>월봉</button>
				<button onClick={() => handlePeriodDivChange(PeriodDiv.YEARLY)}>최대</button>
			</div>
			<ResponsiveContainer width="95%" height={window.innerHeight / 4}>
				<AreaChart
					width={1000}
					height={400}
					data={chartData}
					margin={{
						top: 40, // 상단 마진을 더 크게 설정합니다.
						right: 30,
						left: 0,
						bottom: 40, // 하단 마진을 추가로 설정합니다.
					}}
				>
					<defs>
						<linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
							<stop offset="5%" stopColor="#FF0000" stopOpacity={0.8} />
							<stop offset="95%" stopColor="#FF0000" stopOpacity={0.2} />
						</linearGradient>
					</defs>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="name" tickLine={false} axisLine={false} />
					<YAxis
						type="number"
						domain={[0, getMaxCloseValue() + 1000]}
						dataKey="close"
						orientation="right"
						tickSize={10}
					/>
					<Tooltip />
					<Area type="monotone" dataKey="date" stroke="none" activeDot={false} fillOpacity={0} fill="#808080" />
					<Area type="monotone" dataKey="open" stroke="none" activeDot={false} fillOpacity={0} fill="#808080" />
					<Area type="monotone" dataKey="close" stroke="#8884d8" fillOpacity={1} fill="url(#color)" />
					<Area type="monotone" dataKey="high" stroke="none" activeDot={false} fillOpacity={0} fill="#808080" />
					<Area type="monotone" dataKey="low" stroke="none" activeDot={false} fillOpacity={0} fill="#808080" />
					<Area type="monotone" dataKey="volume" stroke="none" activeDot={false} fillOpacity={0} fill="#808080" />
				</AreaChart>
			</ResponsiveContainer>
		</div>
	);
};

export default Chart;
