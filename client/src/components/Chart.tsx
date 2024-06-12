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
		</div>
	);
};

export default Chart;
