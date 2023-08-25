import React from "react";
import { IncomeStatementProps } from "./types/Chart/interface";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const IncomeStatement: React.FC<IncomeStatementProps> = ({ IncomeStatementData }) => {
	const fiveIncomeStatementData = IncomeStatementData.slice(0, 5);

	const getMaxValue = () => {
		const maxValue = Math.max(...fiveIncomeStatementData.map((data: any) => data.saleAccount));
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
							<div className="w-3 h-3 bg-[#5882FA] rounded-full mr-2"></div> 매출액(억) :
						</div>
						<div className="mx-2">{props.payload[0].value}</div>
					</div>
					<div className="flex justify-between">
						<div className="flex items-center">
							<div className="w-3 h-3 bg-[#82ca9d] rounded-full mr-2"></div> 영업이익(억) :
						</div>
						<div className="mx-2">{props.payload[1].value}</div>
					</div>
					<div className="flex justify-between">
						<div className="flex items-center">
							<div className="w-3 h-3 bg-[#FACC2E] rounded-full mr-2"></div> 당기순이익(억) :
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
			<h2 className="text-xl font-semibold mb-4">Income Statement</h2>
			<div className="w-full mb-4">
				<ResponsiveContainer width="100%" aspect={4 / 1}>
					<BarChart data={fiveIncomeStatementData}>
						<CartesianGrid strokeDasharray="10 0" vertical={false} />
						{/* <XAxis dataKey="stacYymm" tickFormatter={formatDate} axisLine={false} /> */}
						<YAxis axisLine={false} domain={["auto", Math.floor(getMaxValue() * 1.1)]} width={80} />
						<Tooltip content={CustomTooltip} cursor={{ fill: "transparent" }} />
						<Legend
							iconType="circle"
							iconSize={8}
							align="right"
							verticalAlign="top"
							wrapperStyle={{ top: -20, right: 0 }}
						/>
						<Bar dataKey="saleAccount" fill="#5882FA" name="매출액" barSize={25} radius={[5, 5, 5, 5]} />
						<Bar dataKey="bsopPrti" fill="#82ca9d" name="영업이익" barSize={25} radius={[5, 5, 5, 5]} />
						<Bar dataKey="thtrNtin" fill="#FACC2E" name="당기순이익" barSize={25} radius={[5, 5, 5, 5]} />
					</BarChart>
				</ResponsiveContainer>
			</div>
		</div>
	);
};

export default IncomeStatement;
