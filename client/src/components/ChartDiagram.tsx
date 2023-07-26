// ChartDiagram.tsx
import React from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { ChartDiagramProps } from "./types/Chart/interface";
import { PeriodDiv } from "./types/Chart/enum";

const ChartDiagram: React.FC<ChartDiagramProps> = ({ chartDiagramData, handlePeriodDivChange }) => {
	const getMaxCloseValue = () => {
		const maxClose = Math.max(...chartDiagramData.map((data: any) => data.close));
		return Math.ceil(maxClose / 10000) * 10000;
	};

	const [selectedPeriod, setSelectedPeriod] = React.useState<PeriodDiv>(PeriodDiv.DAILY);

	const handleButtonClick = (period: PeriodDiv) => {
		setSelectedPeriod(period);
		handlePeriodDivChange(period);
	};

	return (
		<div className="w-full">
			<div className="flex justify-start my-4">
				<div className="relative mx-2">
					<button
						className={`px-4 py-2 rounded-md hover:bg-gray-200 ${
							selectedPeriod === PeriodDiv.DAILY ? "text-green-600" : "text-gray-700"
						}`}
						onClick={() => handleButtonClick(PeriodDiv.DAILY)}
					>
						3달
					</button>
					{selectedPeriod === PeriodDiv.DAILY && <div className="absolute bottom-0 left-0 w-full h-1 bg-green-600" />}
				</div>
				<div className="relative mx-2">
					<button
						className={`px-4 py-2 rounded-md hover:bg-gray-200 ${
							selectedPeriod === PeriodDiv.WEEKLY ? "text-green-600" : "text-gray-700"
						}`}
						onClick={() => handleButtonClick(PeriodDiv.WEEKLY)}
					>
						2년
					</button>
					{selectedPeriod === PeriodDiv.WEEKLY && <div className="absolute bottom-0 left-0 w-full h-1 bg-green-600" />}
				</div>
				<div className="relative mx-2">
					<button
						className={`px-4 py-2 rounded-md hover:bg-gray-200 ${
							selectedPeriod === PeriodDiv.MONTHLY ? "text-green-600" : "text-gray-700"
						}`}
						onClick={() => handleButtonClick(PeriodDiv.MONTHLY)}
					>
						5년
					</button>
					{selectedPeriod === PeriodDiv.MONTHLY && <div className="absolute bottom-0 left-0 w-full h-1 bg-green-600" />}
				</div>
				<div className="relative mx-2">
					<button
						className={`px-4 py-2 rounded-md hover:bg-gray-200 ${
							selectedPeriod === PeriodDiv.YEARLY ? "text-green-600" : "text-gray-700"
						}`}
						onClick={() => handleButtonClick(PeriodDiv.YEARLY)}
					>
						최대
					</button>
					{selectedPeriod === PeriodDiv.YEARLY && <div className="absolute bottom-0 left-0 w-full h-1 bg-green-600" />}
				</div>
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
							<stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
							<stop offset="95%" stopColor="#82ca9d" stopOpacity={0.2} />
						</linearGradient>
					</defs>
					<CartesianGrid strokeDasharray="10 0" vertical={false} />
					<XAxis
						dataKey="name"
						axisLine={false}
						tickLine={true}
						// tick={{ stroke: "black", strokeWidth: 0.5 }}
						minTickGap={Math.floor(chartDiagramData.length) * 3}
					/>
					<YAxis
						type="number"
						domain={["auto", getMaxCloseValue() + 1000]}
						// tick={{ stroke: "black", strokeWidth: 0.5 }}
						dataKey="close"
						axisLine={false}
					/>
					<Tooltip />
					<Area type="monotone" dataKey="date" stroke="none" activeDot={false} fillOpacity={0} fill="#808080" />
					<Area type="monotone" dataKey="open" stroke="none" activeDot={false} fillOpacity={0} fill="#808080" />
					<Area type="monotone" dataKey="close" stroke="#82ca9d" fillOpacity={1} fill="url(#color)" />
					<Area type="monotone" dataKey="high" stroke="none" activeDot={false} fillOpacity={0} fill="#808080" />
					<Area type="monotone" dataKey="low" stroke="none" activeDot={false} fillOpacity={0} fill="#808080" />
					<Area type="monotone" dataKey="volume" stroke="none" activeDot={false} fillOpacity={0} fill="#808080" />
				</AreaChart>
			</ResponsiveContainer>
		</div>
	);
};

export default ChartDiagram;
