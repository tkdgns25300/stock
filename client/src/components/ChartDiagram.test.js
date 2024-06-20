import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ChartDiagram from "../components/ChartDiagram";
import { PeriodDiv } from "../types/Chart/enum";

const mockData = [
	{ name: "2024-01-01", open: 100, close: 120, high: 130, low: 90, volume: 1000 },
	{ name: "2024-01-02", open: 120, close: 140, high: 150, low: 110, volume: 1200 },
];

const mockHandlePeriodDivChange = jest.fn();

describe("ChartDiagram Component", () => {
	test("renders ChartDiagram with buttons and chart", () => {
		render(<ChartDiagram chartDiagramData={mockData} handlePeriodDivChange={mockHandlePeriodDivChange} />);

		expect(screen.getByText("3달")).toBeInTheDocument();
		expect(screen.getByText("2년")).toBeInTheDocument();
		expect(screen.getByText("5년")).toBeInTheDocument();
		expect(screen.getByText("최대")).toBeInTheDocument();

		expect(screen.getByText("날짜")).toBeInTheDocument();
		expect(screen.getByText("시작가")).toBeInTheDocument();
		expect(screen.getByText("종가")).toBeInTheDocument();
		expect(screen.getByText("최고가")).toBeInTheDocument();
		expect(screen.getByText("최저가")).toBeInTheDocument();
		expect(screen.getByText("거래량")).toBeInTheDocument();
	});

	test("handles button click and updates state", () => {
		render(<ChartDiagram chartDiagramData={mockData} handlePeriodDivChange={mockHandlePeriodDivChange} />);

		fireEvent.click(screen.getByText("2년"));
		expect(mockHandlePeriodDivChange).toHaveBeenCalledWith(PeriodDiv.WEEKLY);

		fireEvent.click(screen.getByText("5년"));
		expect(mockHandlePeriodDivChange).toHaveBeenCalledWith(PeriodDiv.MONTHLY);

		fireEvent.click(screen.getByText("최대"));
		expect(mockHandlePeriodDivChange).toHaveBeenCalledWith(PeriodDiv.YEARLY);
	});
});
