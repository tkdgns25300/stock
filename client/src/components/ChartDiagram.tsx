import React from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { ChartDiagramProps } from "./types/Chart/interface";
import { PeriodDiv } from "./types/Chart/enum";

const ChartDiagram: React.FC<ChartDiagramProps> = ({ chartDiagramData, handlePeriodDivChange }) => {
	const getMaxCloseValue = () => {
		const maxClose = Math.max(...chartDiagramData.map((data: any) => data.close));
		console.log(chartDiagramData.length);
		return Math.ceil(maxClose / 10000) * 10000;
	};

	return (
		<div className="w-full">
			<div>
				<button className="bg-gray-200 p-2 rounded-md mx-2" onClick={() => handlePeriodDivChange(PeriodDiv.DAILY)}>
					Day
				</button>
				<button className="bg-gray-200 p-2 rounded-md mx-2" onClick={() => handlePeriodDivChange(PeriodDiv.WEEKLY)}>
					Week
				</button>
				<button className="bg-gray-200 p-2 rounded-md mx-2" onClick={() => handlePeriodDivChange(PeriodDiv.MONTHLY)}>
					Month
				</button>
				<button className="bg-gray-200 p-2 rounded-md mx-2" onClick={() => handlePeriodDivChange(PeriodDiv.YEARLY)}>
					Max
				</button>
			</div>
			<ResponsiveContainer width="95%" height={window.innerHeight / 4}>
				<AreaChart
					width={1000}
					height={400}
					data={chartDiagramData}
					margin={{
						top: 40,
						right: 30,
						left: 0,
						bottom: 40,
					}}
				>
					<defs>
						<linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
							<stop offset="5%" stopColor="#FF0000" stopOpacity={0.8} />
							<stop offset="95%" stopColor="#FF0000" stopOpacity={0.2} />
						</linearGradient>
					</defs>
					<CartesianGrid strokeDasharray="10 0" vertical={false} />
					<XAxis
						dataKey="name"
						axisLine={false}
						tickLine={true}
						tick={{ stroke: "black", strokeWidth: 0.5 }}
						minTickGap={Math.floor(chartDiagramData.length) * 3}
						// angle={-45}
					/>
					<YAxis
						type="number"
						domain={["auto", getMaxCloseValue() + 1000]}
						tick={{ stroke: "black", strokeWidth: 0.5 }}
						dataKey="close"
						axisLine={false}
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

export default ChartDiagram;
