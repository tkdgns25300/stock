import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ChartSummary from "../components/ChartSummary";

const mockPriceInfoData = {
	stckPrpr: 150000,
	prdyVrss: 1000,
	stckLwpr: 145000,
	stckHgpr: 155000,
	w52Lwpr: 120000,
	w52Hgpr: 170000,
	htsAvls: "1000000",
};

describe("ChartSummary Component", () => {
	test("renders price information correctly", () => {
		render(<ChartSummary priceInfoData={mockPriceInfoData} />);

		expect(screen.getByText("전일 종가")).toBeInTheDocument();
		expect(screen.getByText("₩149,000")).toBeInTheDocument();
		expect(screen.getByText("일일 변동폭")).toBeInTheDocument();
		expect(screen.getByText("₩145,000 - ₩155,000")).toBeInTheDocument();
		expect(screen.getByText("52주 변동폭")).toBeInTheDocument();
		expect(screen.getByText("₩120,000 - ₩170,000")).toBeInTheDocument();
		expect(screen.getByText("시가총액(억)")).toBeInTheDocument();
		expect(screen.getByText("1000000 (KRW)")).toBeInTheDocument();
	});
});
