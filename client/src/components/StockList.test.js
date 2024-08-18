import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import StockItem from "./StockItem";

describe("StockItem Component", () => {
	test("renders company name, stock code, and stock type correctly", () => {
		const mockStockItem = {
			companyName: "Apple Inc.",
			stockCode: "AAPL",
			stockType: "Common Stock",
		};

		render(<StockItem {...mockStockItem} />);

		// 회사 이름이 올바르게 렌더링되었는지 확인
		const companyNameElement = screen.getByText(mockStockItem.companyName);
		expect(companyNameElement).toBeInTheDocument();

		// 주식 코드가 올바르게 렌더링되었는지 확인
		const stockCodeElement = screen.getByText(mockStockItem.stockCode);
		expect(stockCodeElement).toBeInTheDocument();

		// 주식 유형이 올바르게 렌더링되었는지 확인
		const stockTypeElement = screen.getByText(mockStockItem.stockType);
		expect(stockTypeElement).toBeInTheDocument();
	});

	test("applies correct CSS classes to elements", () => {
		const mockStockItem = {
			companyName: "Microsoft Corp.",
			stockCode: "MSFT",
			stockType: "Preferred Stock",
		};

		render(<StockItem {...mockStockItem} />);

		// 회사 이름이 올바른 CSS 클래스를 가지고 있는지 확인
		const companyNameElement = screen.getByText(mockStockItem.companyName);
		expect(companyNameElement).toHaveClass("text-gray-200");

		// 주식 유형이 올바른 CSS 클래스를 가지고 있는지 확인
		const stockTypeElement = screen.getByText(mockStockItem.stockType);
		expect(stockTypeElement).toHaveClass("text-gray-500");

		// 주식 코드가 올바른 CSS 클래스를 가지고 있는지 확인
		const stockCodeElement = screen.getByText(mockStockItem.stockCode);
		expect(stockCodeElement).toHaveClass("text-gray-200");
	});
});
