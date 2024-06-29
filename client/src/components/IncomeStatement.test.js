import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import IncomeStatement from "../components/IncomeStatement";
import IncomeStatementQuartly from "../components/IncomeStatementQuartly";
import { BarChart, Bar } from "recharts";

// Mock the IncomeStatementQuartly component
jest.mock("../components/IncomeStatementQuartly", () => {
	return (props) => (
		<div>
			<h1>IncomeStatementQuartly Component</h1>
			<div>Current Data: {JSON.stringify(props.curIncomeStatementData)}</div>
			<div>Previous Data: {JSON.stringify(props.previousIncomeStatementData)}</div>
		</div>
	);
});

const mockIncomeStatementData = [
	{ stacYymm: "2024-06", saleAccount: 10000, bsopPrti: 5000, thtrNtin: 3000 },
	{ stacYymm: "2024-03", saleAccount: 12000, bsopPrti: 6000, thtrNtin: 3500 },
	{ stacYymm: "2023-12", saleAccount: 11000, bsopPrti: 5500, thtrNtin: 3200 },
	{ stacYymm: "2023-09", saleAccount: 13000, bsopPrti: 7000, thtrNtin: 4000 },
	{ stacYymm: "2023-06", saleAccount: 14000, bsopPrti: 7500, thtrNtin: 4500 },
	{ stacYymm: "2023-03", saleAccount: 12500, bsopPrti: 6500, thtrNtin: 3700 },
	{ stacYymm: "2022-12", saleAccount: 13500, bsopPrti: 6800, thtrNtin: 4200 },
];
