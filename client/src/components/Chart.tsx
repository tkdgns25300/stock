import React, { useEffect, useState } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface ChartData {
	stck_bsop_date: string;
	stck_oprc: string;
	stck_clpr: string;
	stck_hgpr: string;
	stck_lwpr: string;
	acml_vol: string;
}

const Chart = () => {
	const [chartData, setChartData] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(`${process.env.REACT_APP_SERVER_URI}/company/chart-data`);
				const data = await response.json();
				const sortedData = data.result.sort((a: ChartData, b: ChartData) =>
					a.stck_bsop_date.localeCompare(b.stck_bsop_date),
				);

				const formatDate = (dateStr: string) => {
					const year = dateStr.substring(0, 4);
					const month = dateStr.substring(4, 6);
					const day = dateStr.substring(6, 8);
					return `${month}/${day}/${year}`;
				};

				setChartData(
					sortedData.map((item: ChartData, i: number) => ({
						name: `${parseInt(item.stck_bsop_date.substring(4, 6), 10)}/${parseInt(
							item.stck_bsop_date.substring(6, 8),
							10,
						)}`,
						date: formatDate(item.stck_bsop_date),
						open: item.stck_oprc,
						close: item.stck_clpr,
						high: item.stck_hgpr,
						low: item.stck_lwpr,
						volume: item.acml_vol,
					})),
				);
				setLoading(false);
			} catch (error) {
				console.error(error);
			}
		};

		fetchData();
	}, []);

	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<ResponsiveContainer width="95%" height={window.innerHeight / 4}>
			<AreaChart
				width={500}
				height={400}
				data={chartData}
				margin={{
					top: 10,
					right: 30,
					left: 0,
					bottom: 0,
				}}
			>
				<defs>
					<linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
						<stop offset="5%" stopColor="#FF0000" stopOpacity={0.8} />
						<stop offset="95%" stopColor="#FF0000" stopOpacity={0} />
					</linearGradient>
				</defs>
				<CartesianGrid strokeDasharray="3 3" />/
				<XAxis dataKey="name" tickLine={false} axisLine={false} />
				<YAxis dataKey="close" orientation="right" />
				<Tooltip />
				<Area type="monotone" dataKey="date" stroke="none" activeDot={false} fillOpacity={0} fill="#808080" />
				<Area type="monotone" dataKey="open" stroke="none" activeDot={false} fillOpacity={0} fill="#808080" />
				<Area type="monotone" dataKey="close" stroke="#8884d8" fillOpacity={1} fill="url(#color)" />
				<Area type="monotone" dataKey="high" stroke="none" activeDot={false} fillOpacity={0} fill="#808080" />
				<Area type="monotone" dataKey="low" stroke="none" activeDot={false} fillOpacity={0} fill="#808080" />
				<Area type="monotone" dataKey="volume" stroke="none" activeDot={false} fillOpacity={0} fill="#808080" />
			</AreaChart>
		</ResponsiveContainer>
	);
};

export default Chart;
