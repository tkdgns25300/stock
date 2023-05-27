import React, { useEffect, useState } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const Chart = () => {
	const [chartData, setChartData] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const headers = {
					"Content-Type": "application/json; charset=utf-8",
					appkey: "PSr2axang31iCePXN2s7ekVDxtKrXhTgPCs2",
					appsecret:
						"CHew135tcQ1GMyh4G/A4uibl5FjYI3blt7vU/0/1Sk2x1izcjI1NbdbKMOeQy0TfRyObQgOg9iEO1m71epi7fGV2N5ts2daXPENBlLQ6DfD0fw4k3eVqXdCTYDJHIt1t7Mk7JFpzfAEYdJm8NzYnrVQSCCtmgyuJ0YkWEU0XGwVsWd5TgGE=",
					tr_id: "FHKST03010100",
					custtype: "P",
					Authorization:
						"Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0b2tlbiIsImF1ZCI6IjFlNjdkZjQ1LTMwZTAtNDZjNC1iNjNkLWZkMzVmN2Y5OTQ0YiIsInByZHRfY2QiOiIiLCJpc3MiOiJ1bm9ndyIsImV4cCI6MTcxNzU4MDEyMiwiaWF0IjoxNzE3NDkzNzIyLCJqdGkiOiJQU3IyYXhhbmczMWlDZVBYTjJzN2VrVkR4dEtyWGhUZ1BDczIifQ.qYZm12EKASEYYEWayqfMMUTPjNbxr3yVyPJ9bnn8oixXNFfxqQy1uLpXeltGoFLRKrqDexGOgucvV4bz0ZZvhA",
				};
				const query = {
					FID_COND_MRKT_DIV_CODE: "J",
					FID_INPUT_ISCD: "005930",
					FID_INPUT_DATE_1: "20240501",
					FID_INPUT_DATE_2: "20240531",
					FID_PERIOD_DIV_CODE: "D",
					FID_ORG_ADJ_PRC: "1",
				};
				const response = await fetch(
					"https://openapi.koreainvestment.com:9443/uapi/domestic-stock/v1/quotations/inquire-daily-itemchartprice?" +
						new URLSearchParams(query),
					{
						headers,
					},
				);
				const data = await response.json();
				console.log(data);
				setChartData(data);
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
		<ResponsiveContainer width="100%" height="100%">
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
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="name" />
				<YAxis />
				<Tooltip />
				<Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
			</AreaChart>
		</ResponsiveContainer>
	);
};

export default Chart;
