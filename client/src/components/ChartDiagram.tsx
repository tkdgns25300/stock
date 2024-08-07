import React, { useState } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { ChartDiagramProps } from "./types/Chart/interface";
import { PeriodDiv } from "./types/Chart/enum";

const ChartDiagram: React.FC<ChartDiagramProps> = ({ chartDiagramData, handlePeriodDivChange }) => {
	const getMaxCloseValue = () => {
		const maxClose = Math.max(...chartDiagramData.map((data: any) => data.close));
		return maxClose;
	};

	const [selectedPeriod, setSelectedPeriod] = useState<PeriodDiv>(PeriodDiv.DAILY);

	const handleButtonClick = (period: PeriodDiv) => {
		setSelectedPeriod(period);
		handlePeriodDivChange(period);
	};

	const CustomTooltip = (props: any) => {
		if (props.payload != null && props.payload[0] != null) {
			return (
				<div className="bg-white p-5 rounded-xl shadow-xl font-doHyeon text-base">
					<div className="flex justify-between">
						<span>날짜 :</span>
						<span className="mx-2">{props.payload[0].value}</span>
					</div>
					<div className="flex justify-between">
						<span>시작가 :</span>
						<span className="mx-2">{props.payload[1].value}</span>
					</div>
					<div className="flex justify-between text-emerald-600">
						<span>종가 :</span>
						<span className="mx-2">{props.payload[2].value}</span>
					</div>
					<div className="flex justify-between">
						<span>최고가 :</span>
						<span className="mx-2">{props.payload[3].value}</span>
					</div>
					<div className="flex justify-between">
						<span>최저가 :</span>
						<span className="mx-2">{props.payload[4].value}</span>
					</div>
					<div className="flex justify-between">
						<span>거래량 :</span>
						<span className="mx-2">{props.payload[5].value}</span>
					</div>
				</div>
			);
		}
	};

	return (
		<div className="w-full">
			<div className="flex justify-start my-2">
				<div className="relative mx-2">
					<button
						className={`tablet:text-base mobile:text-sm text-xs px-4 py-2 rounded-md hover:bg-gray-200 ${
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
						className={`tablet:text-base mobile:text-sm text-xs  px-4 py-2 rounded-md hover:bg-gray-200 ${
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
						className={`tablet:text-base mobile:text-sm text-xs  px-4 py-2 rounded-md hover:bg-gray-200 ${
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
						className={`tablet:text-base mobile:text-sm text-xs  px-4 py-2 rounded-md hover:bg-gray-200 ${
							selectedPeriod === PeriodDiv.YEARLY ? "text-green-600" : "text-gray-700"
						}`}
						onClick={() => handleButtonClick(PeriodDiv.YEARLY)}
					>
						최대
					</button>
					{selectedPeriod === PeriodDiv.YEARLY && <div className="absolute bottom-0 left-0 w-full h-1 bg-green-600" />}
				</div>
			</div>
			<ResponsiveContainer width="100%" height={330}>
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
						minTickGap={Math.floor(chartDiagramData.length) * 2}
					/>
					<YAxis
						type="number"
						// domain={["auto", Math.floor(getMaxCloseValue() * 1.1)]}
						domain={["auto", Math.floor(getMaxCloseValue() * 1.1)]}
						// tick={{ stroke: "black", strokeWidth: 0.5 }}
						dataKey="close"
						axisLine={false}
					/>
					<Tooltip content={CustomTooltip} />
					<Area
						type="monotone"
						dataKey="date"
						name="날짜"
						stroke="none"
						activeDot={false}
						fillOpacity={0}
						fill="#808080"
					/>
					<Area
						type="monotone"
						dataKey="open"
						name="시작가"
						stroke="none"
						activeDot={false}
						fillOpacity={0}
						fill="#808080"
					/>
					<Area type="monotone" dataKey="close" name="종가" stroke="#82ca9d" fillOpacity={1} fill="url(#color)" />
					<Area
						type="monotone"
						dataKey="high"
						name="최고가"
						stroke="none"
						activeDot={false}
						fillOpacity={0}
						fill="#808080"
					/>
					<Area
						type="monotone"
						dataKey="low"
						name="최저가"
						stroke="none"
						activeDot={false}
						fillOpacity={0}
						fill="#808080"
					/>
					<Area
						type="monotone"
						dataKey="volume"
						name="거래량"
						stroke="none"
						activeDot={false}
						fillOpacity={0}
						fill="#808080"
					/>
				</AreaChart>
			</ResponsiveContainer>
		</div>
	);
};

export default ChartDiagram;
