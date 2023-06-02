import React from "react";
import ChartDiagram from "./ChartDiagram";

interface ChartProps {
	stockCode: string;
}

const Chart: React.FC<ChartProps> = ({ stockCode }) => {
	return <ChartDiagram stockCode={stockCode} />;
};

export default Chart;
