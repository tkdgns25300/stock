import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ProfitRatio from "../components/ProfitRatio";
import ProfitRatioQuartly from "../components/ProfitRatioQuartly";

// Mock the ProfitRatioQuartly component
jest.mock("../components/ProfitRatioQuartly", () => {
	return (props) => (
		<div>
			<h1>ProfitRatioQuartly Component</h1>
			<div>Current Data: {JSON.stringify(props.curProfitRatioData)}</div>
			<div>Previous Data: {JSON.stringify(props.previousProfitRatioData)}</div>
		</div>
	);
});

const mockProfitRatioData = [
	{ stacYymm: "2024-06", saleNtinRate: 12, cptlNtinRate: 8, selfCptlNtinInrt: 6 },
	{ stacYymm: "2024-03", saleNtinRate: 10, cptlNtinRate: 7, selfCptlNtinInrt: 5 },
	{ stacYymm: "2023-12", saleNtinRate: 11, cptlNtinRate: 7.5, selfCptlNtinInrt: 5.5 },
	{ stacYymm: "2023-09", saleNtinRate: 13, cptlNtinRate: 8.5, selfCptlNtinInrt: 6.5 },
	{ stacYymm: "2023-06", saleNtinRate: 14, cptlNtinRate: 9, selfCptlNtinInrt: 7 },
	{ stacYymm: "2023-03", saleNtinRate: 15, cptlNtinRate: 9.5, selfCptlNtinInrt: 7.5 },
	{ stacYymm: "2022-12", saleNtinRate: 16, cptlNtinRate: 10, selfCptlNtinInrt: 8 },
];
