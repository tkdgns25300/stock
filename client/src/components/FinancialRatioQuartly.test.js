import React from "react";
import { render, screen } from "@testing-library/react";
import FinancialRatioQuartly from "./FinancialRatioQuartly";
import { FinancialRatioData } from "./types/Finance/interface";

const mockCurData = {
	stacYymm: "2024-08",
	grs: 12.34,
	bsopPrfiInrt: 8.9,
	ntinInrt: 5.67,
	roeVal: 7.89,
	eps: 1234.56,
	sps: 789.01,
	bps: 456.78,
	rsrvRate: 23.45,
	lbltRate: 34.56,
};

const mockPrevData = {
	stacYymm: "2024-07",
	grs: 11.23,
	bsopPrfiInrt: 7.89,
	ntinInrt: 6.78,
	roeVal: 6.78,
	eps: 1122.33,
	sps: 765.43,
	bps: 432.1,
	rsrvRate: 22.34,
	lbltRate: 33.45,
};

test("renders FinancialRatioQuartly with correct values", () => {
	render(<FinancialRatioQuartly curFinancialRatioData={mockCurData} previousFinancialRatioData={mockPrevData} />);

	const formatValue = (value, unit) => {
		if (unit === "%") {
			return `${value.toFixed(2)}%`;
		}
		if (unit === "조" || unit === "억") {
			return value >= 10000 ? `${(value / 10000).toFixed(2)}조` : `${value.toFixed(2)}억`;
		}
		if (unit === "원") {
			return `${value.toFixed(0)}원`;
		}
		return value.toFixed(2);
	};

	const dataItems = [
		{ label: "매출액 증가율", key: "grs", unit: "" },
		{ label: "영업이익 증가율", key: "bsopPrfiInrt", unit: "" },
		{ label: "순이익 증가율", key: "ntinInrt", unit: "" },
		{ label: "ROE", key: "roeVal", unit: "" },
		{ label: "EPS", key: "eps", unit: "" },
		{ label: "주당매출액", key: "sps", unit: "" },
		{ label: "BPS", key: "bps", unit: "" },
		{ label: "유보비율", key: "rsrvRate", unit: "" },
		{ label: "부채비율", key: "lbltRate", unit: "" },
	];

	dataItems.forEach((item) => {
		expect(screen.getByText(item.label)).toBeInTheDocument();
		expect(screen.getByText(formatValue(mockCurData[item.key], item.unit))).toBeInTheDocument();
	});
});
