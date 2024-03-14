import React, { useState } from "react";
import { BalanceSheetProps } from "./types/Finance/interface";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import BalanceSheetQuartly from "./BalanceSheetQuartly";

const BalanceSheet: React.FC<BalanceSheetProps> = ({ balanceSheetData }) => {
	const [selectedIndex, setSelectedIndex] = useState<number>(4);
	const sixBalanceSheetData = balanceSheetData.slice(-6);
	const fiveBalanceSheetData = balanceSheetData.slice(-5);

	const handleBarClick = (info: any) => {
		setSelectedIndex(info.index);
	};

	const getMaxValue = () => {
		const maxValue = Math.max(
			...fiveBalanceSheetData.map((data: any) => Math.max(data.totalAset, data.totalLblt, data.totalCptl)),
		);
		return maxValue;
	};

	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		const year = date.getFullYear();
		const month = date.getMonth() + 1;
		return `${year}년 ${month}월`;
	};

	const CustomTooltip = (props: any) => {
		if (props.payload != null && props.payload[0] != null) {
			return (
				<div className="bg-white p-5 rounded-xl shadow-xl font-doHyeon">
					<div className="flex justify-between">
						<div className="flex items-center">
							<div className="w-3 h-3 bg-[#5882FA] rounded-full mr-2"></div> 총자산(억) :
						</div>
						<div className="mx-2">{props.payload[0].value}</div>
					</div>
					<div className="flex justify-between">
						<div className="flex items-center">
							<div className="w-3 h-3 bg-[#82ca9d] rounded-full mr-2"></div> 총자본(억) :
						</div>
						<div className="mx-2">{props.payload[1].value}</div>
					</div>
					<div className="flex justify-between">
						<div className="flex items-center">
							<div className="w-3 h-3 bg-[#FACC2E] rounded-full mr-2"></div> 총부채(억) :
						</div>
						<div className="mx-2">{props.payload[2].value}</div>
					</div>
				</div>
			);
		}
		return null;
	};

	return (
		<div className="w-full">
			<div className="tablet:block hidden w-full mx-4 my-8">
				<ResponsiveContainer width="100%" height={400}>
					<BarChart data={fiveBalanceSheetData} margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>
						<CartesianGrid strokeDasharray="10 0" vertical={false} />
						<XAxis
							dataKey="stacYymm"
							tickFormatter={formatDate}
							axisLine={false}
							tickMargin={20}
							onClick={(info) => handleBarClick(info)}
							tick={(props) => {
								const isSelected = props.index === selectedIndex;
								return (
									<g
										transform={`translate(${props.x},${props.y})`}
										cursor="pointer"
										onClick={() => handleBarClick({ index: props.index })}
									>
										{isSelected && <rect x={-50} y={-10} width={100} height={40} fill="#dceff7" rx={3} ry={3} />}
										<text
											className="font-gothic-a1 font-bold text-base"
											fill={isSelected ? "#0447c4" : "black"}
											x={0}
											y={0}
											dy={16}
											textAnchor="middle"
										>
											{formatDate(props.payload.value)}
										</text>
									</g>
								);
							}}
						/>

						<YAxis
							axisLine={false}
							domain={["auto", Math.floor(getMaxValue() * 1.1)]}
							width={80}
							tickFormatter={(tickItem: number) => {
								if (tickItem >= 10000) {
									return `${(tickItem / 10000).toFixed(1)}조`; // 1조 = 100,000억
								}
								return `${tickItem.toFixed(1)}억`;
							}}
						/>
						<Tooltip content={CustomTooltip} cursor={{ fill: "transparent" }} />
						<Legend
							iconType="circle"
							iconSize={8}
							align="right"
							verticalAlign="top"
							wrapperStyle={{ top: 0, right: 30 }}
						/>
						<Bar dataKey="totalAset" fill="#5882FA" name="총자산" barSize={25} radius={[5, 5, 5, 5]} />
						<Bar dataKey="totalCptl" fill="#82ca9d" name="총자본" barSize={25} radius={[5, 5, 5, 5]} />
						<Bar dataKey="totalLblt" fill="#FACC2E" name="총부채" barSize={25} radius={[5, 5, 5, 5]} />
					</BarChart>
				</ResponsiveContainer>
			</div>
			{fiveBalanceSheetData.length > 0 && (
				<BalanceSheetQuartly
					curBalanceSheetData={fiveBalanceSheetData[selectedIndex]}
					previousBalanceSheetData={sixBalanceSheetData[selectedIndex]}
				/>
			)}
		</div>
	);
};

export default BalanceSheet;
