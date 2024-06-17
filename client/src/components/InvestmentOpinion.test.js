import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import InvestmentOpinion from "../components/InvestmentOpinion";

global.fetch = jest.fn();

describe("InvestmentOpinion Component", () => {
	const mockStockCode = "AAPL";

	beforeEach(() => {
		jest.resetAllMocks();
	});

	test("renders loading state and then investment opinions", async () => {
		const mockInvestmentData = {
			result: [
				{
					stckBsopDate: "2024-08-01",
					invtOpnn: "Buy",
					stckPrpr: "150.00",
					mbcrName: "Goldman Sachs",
					htsGoalPrc: "160.00",
				},
				{
					stckBsopDate: "2024-08-02",
					invtOpnn: "Hold",
					stckPrpr: "155.00",
					mbcrName: "Morgan Stanley",
					htsGoalPrc: "155.00",
				},
			],
		};

		fetch.mockImplementation(() =>
			Promise.resolve({
				ok: true,
				json: () => Promise.resolve(mockInvestmentData),
			}),
		);

		render(<InvestmentOpinion stockCode={mockStockCode} />);

		expect(screen.getByText("Loading...")).toBeInTheDocument();

		await waitFor(() => {
			expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
		});

		expect(screen.getByText("Buy")).toBeInTheDocument();
		expect(screen.getByText("Hold")).toBeInTheDocument();

		fireEvent.click(screen.getByText("Load More"));

		expect(fetch).toHaveBeenCalledTimes(1);
	});

	test("handles error state", async () => {
		fetch.mockImplementation(() =>
			Promise.resolve({
				ok: false,
				status: 500,
			}),
		);

		render(<InvestmentOpinion stockCode={mockStockCode} />);

		expect(screen.getByText("Loading...")).toBeInTheDocument();

		await waitFor(() => {
			expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
		});

		// Add additional error state checks if necessary
	});

	test("shows Load More button if there are more opinions to load", async () => {
		const mockInvestmentData = {
			result: Array(10).fill({
				stckBsopDate: "2024-08-01",
				invtOpnn: "Buy",
				stckPrpr: "150.00",
				mbcrName: "Goldman Sachs",
				htsGoalPrc: "160.00",
			}),
		};

		fetch.mockImplementation(() =>
			Promise.resolve({
				ok: true,
				json: () => Promise.resolve(mockInvestmentData),
			}),
		);

		render(<InvestmentOpinion stockCode={mockStockCode} />);

		await waitFor(() => {
			expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
		});

		expect(screen.getByText("Load More")).toBeInTheDocument();
	});
});
