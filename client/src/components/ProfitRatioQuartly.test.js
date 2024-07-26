import React from "react";
import { render, screen } from "@testing-library/react";
import ProfitRatioQuartly from "./ProfitRatioQuartly";
import { ProfitRatioData } from "./types/Finance/interface";

const mockCurData = {
	stacYymm: "2024-08",
	cptlNtinRate: 15.67,
	selfCptlNtinInrt: 10.34,
	saleNtinRate: 7.89,
	saleTotlRate: 12.34,
};

const mockPrevData = {
	stacYymm: "2024-07",
	cptlNtinRate: 14.56,
	selfCptlNtinInrt: 9.45,
	saleNtinRate: 6.78,
	saleTotlRate: 11.23,
};

test("renders ProfitRatioQuartly with correct values", () => {
	render(<ProfitRatioQuartly curProfitRatioData={mockCurData} previousProfitRatioData={mockPrevData} />);

	const formatValue = (value, unit) => {
		return `${value.toFixed(2)}%`;
	};

	const dataItems = [
		{ label: "총자본 순이익율", key: "cptlNtinRate", unit: "%" },
		{ label: "자기자본 순이익율", key: "selfCptlNtinInrt", unit: "%" },
		{ label: "매출액 순이익율", key: "saleNtinRate", unit: "%" },
		{ label: "매출액 총이익율", key: "saleTotlRate", unit: "%" },
	];

	dataItems.forEach((item) => {
		expect(screen.getByText(item.label)).toBeInTheDocument();
		expect(screen.getByText(formatValue(mockCurData[item.key], item.unit))).toBeInTheDocument();
	});

	expect(screen.getByText(formatDate(mockCurData.stacYymm))).toBeInTheDocument();
});
